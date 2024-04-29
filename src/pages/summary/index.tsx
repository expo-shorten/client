import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { color, fontSize } from "../../styles/theme";

const BASEURL = process.env.REACT_APP_BASE_URL;

interface TotalType {
    que: string;
    sum: string;
}

export const SummaryPage = () => {

    const { state } = useLocation();
    const { files, inputs } = state;

    // 웹 렌더링 구조: 페이지 넘어오면 로딩 -> 원본 / 요약 -> 추가 질문 -> 로딩 -> 질문 응답

    // 원본 요약 데이터 저장
    const [originalSummaryData, setOriginalSummaryData] = useState("");
    // 원본데이터 저장
    const [originalData, setOriginalData] = useState("");
    // 로딩 상태관리
    const [loading, setLoading] = useState<boolean>(false);
    // 추가 질문 인풋 상태관리
    const [input, setInput] = useState<string>("");
    // 질문 요약 모두 모아 보기
    const [totalData, setTotalData] = useState<TotalType[]>([]);
    // 질문
    const [question, setQuestion] = useState<string | null>(null);
    // 요약
    const [summaryData, setSummaryData] = useState<string | null>(null);
    // 질문 로딩
    const [lastLoading, setLastLoging] = useState<boolean>(false);

    useEffect(() => {
        handleGetData()
    }, [files, inputs]);

    const handleGetData = async () => {
        setLoading(true)
        try {
            if (files) {
                let formdata = new FormData();
                formdata.append('video', files);
                const data = await axios.post(`${BASEURL}/upload_video/`, formdata, {
                    headers: {
                        "Contest-Type": "multipart/form-data"
                    }
                });
                setLoading(false)
                setOriginalData(data.data.response)
                setOriginalSummaryData(data.data.summary)
            }
            else if (inputs) {
                const data = await axios.post(`${BASEURL}/upload_url/`, { url: inputs })
                setLoading(false)
                setOriginalData(data.data.response)
                setOriginalSummaryData(data.data.summary)
            }

        }
        catch (err) {
            console.log("에러가 발생하였습니다.");
            console.log(err)
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (e.nativeEvent.isComposing) return
            if (question) {
                if (summaryData) {
                    let copy = totalData
                    copy.push({ que: question, sum: summaryData })
                    setTotalData(copy)
                    setQuestion(null)
                    setSummaryData(null)
                }
            }
            console.log(e.target.value)
            setQuestion(e.target.value)
            setSummaryData("123")
            setLastLoging(true)
            handleQuestion();
            e.target.value = ''
        }
    }

    const handleQuestion = async () => {
        try {
            const data = await axios.post(`${BASEURL}/message_req`, { summary: originalSummaryData, question: question })
            setLastLoging(false)
            setSummaryData(data.data.response)
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleCopyText = (e: number) => {
        if (e == 1) {
            navigator.clipboard.writeText(originalData);
        }
        if (e == 2) {
            navigator.clipboard.writeText(originalSummaryData);
        }
        if (e == 3) {
            if (summaryData) navigator.clipboard.writeText(summaryData);
        }
    }

    const handleDownloadText = (e: number) => {
        let fileName = '요약.txt';
        let output = "";
        if (e == 1) {
            output = originalData;
        }
        if (e == 2) {
            output = originalSummaryData;
        }
        if (e == 3) {
            if (summaryData) output = summaryData;
        }
        const file = new Blob([output], {
            type: 'text/plain',
        });
        let element = document.createElement('a');
        let link = window.URL.createObjectURL(file)
        element.href = link;
        element.download = fileName;
        document.body.appendChild(element); // FireFox
        element.click();
    }

    return (
        <Section>
            <TextFlex>
                {/* 원본과 원본 요약 코드 */}
                <AIText>
                    <Logo src="/assets/img/LongLogo.svg" />
                    {
                        loading ?
                            <>
                                <LoadingFlex>
                                    <LoadingTxt>요약할 영상을 처리하고 있습니다.</LoadingTxt>
                                    <LoadingImg src="/assets/img/Spinner.gif" />
                                </LoadingFlex>
                            </>
                            :
                            <>
                                <Content readOnly defaultValue={originalData}>
                                </Content>
                                <IconFlex>
                                    <Icon onClick={() => handleDownloadText(1)} src="/assets/img/Download.svg" />
                                    <Icon onClick={() => handleCopyText(1)} src="/assets/img/Copy.svg" />
                                </IconFlex>
                                <Content readOnly defaultValue={originalSummaryData}>
                                </Content>
                                <IconFlex>
                                    <Icon onClick={() => handleDownloadText(2)} src="/assets/img/Download.svg" />
                                    <Icon onClick={() => handleCopyText(2)} src="/assets/img/Copy.svg" />
                                </IconFlex>
                            </>
                    }
                </AIText>
                <>
                    {totalData &&
                        totalData.map((qq) => {
                            <MyText>
                                <MyFlex>
                                    <My>나</My>
                                </MyFlex>
                                <MyContentContainer>
                                    <MyContentFlex>
                                        <MyContent>
                                            {qq.que}
                                        </MyContent>
                                    </MyContentFlex>
                                </MyContentContainer>
                            </MyText>
                            {/* 질문 요약 */ }
                            <AIText>
                                <Logo src="/assets/img/LongLogo.svg" />
                                <Content readOnly defaultValue={qq.sum}>
                                </Content>
                                <IconFlex>
                                    <Icon onClick={() => handleDownloadText(2)} src="/assets/img/Download.svg" />
                                    <Icon onClick={() => handleCopyText(2)} src="/assets/img/Copy.svg" />
                                </IconFlex>
                            </AIText>
                        })
                    }
                </>
                <>
                    {
                        question &&
                        <MyText>
                            <MyFlex>
                                <My>나</My>
                            </MyFlex>
                            <MyContentContainer>
                                <MyContentFlex>
                                    <MyContent>
                                        {question}
                                    </MyContent>
                                </MyContentFlex>
                            </MyContentContainer>
                        </MyText>
                    }
                    {/* 질문 요약 */}
                    {
                        summaryData &&
                        <AIText>
                            <Logo src="/assets/img/LongLogo.svg" />
                            {
                                lastLoading ?
                                    <>
                                        <LoadingFlex>
                                            <LoadingTxt>요약할 영상을 처리하고 있습니다.</LoadingTxt>
                                            <LoadingImg src="/assets/img/Spinner.gif" />
                                        </LoadingFlex>
                                    </>
                                    :
                                    <>
                                        <Content readOnly defaultValue={summaryData}>
                                        </Content>
                                    </>
                            }

                        </AIText>
                    }
                </>
            </TextFlex>
            <InputFlex>
                <Input placeholder="추가 적인 내용을 원하시면 질문해주세요" onKeyDown={handleKeyDown} />
                <QuestionBtn src="/assets/img/Question.svg" />
            </InputFlex>
        </Section>
    );
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: calc(100vh - 12vh);
    gap: 50px;
`;

const TextFlex = styled.div`
    width: 90%;
    height: 70vh;
    margin-top: 50px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 30px;
`;

const InputFlex = styled.div`
    width: 90%;
    position: relative;
    margin-bottom: 100px;
`;

const Input = styled.input`
    width: 100%;
    border: 2px solid ${color.red400};
    box-shadow: 0 4px 4px ${color.red300};
    border-radius: 5px;
    background-color: ${color.white};
    padding: 20px 30px;
    font-size: ${fontSize.Body.large.fontSize};
    font-weight: ${fontSize.Body.large.fontWeight};
    line-height: ${fontSize.Body.large.lineHeight};
    color: ${color.gray950};
    outline: none;
`;

const QuestionBtn = styled.img`
    position: absolute;
    width: 40px;
    top: 16px;
    right: 12px;
`;

const AIText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Logo = styled.img`
    width: 100px;
`;

const LoadingFlex = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const LoadingTxt = styled.p`
    font-size: ${fontSize.Body.medium.fontSize};
    font-weight: ${fontSize.Body.medium.fontWeight};
    line-height: ${fontSize.Body.medium.lineHeight};
    color: ${color.gray700};
`;

const LoadingImg = styled.img`
    width: 36px;
`;

const Content = styled.textarea`
    padding: 16px 24px;
    background-color: ${color.white};
    outline: none;
    width: 100%;
    height: 400px;
    resize: none;
    border: none;
    border-radius: 5px;
    font-size: ${fontSize.Body.medium.fontSize};
    font-weight: ${fontSize.Body.medium.fontWeight};
    line-height: ${fontSize.Body.medium.lineHeight};
    color: ${color.gray950};
`;

const IconFlex = styled.div`
    display: flex;
    gap: 8px;
`;

const Icon = styled.img`
    width: 24px;
    border-radius: 2px;
    cursor: pointer;
`;

const MyText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const MyFlex = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const My = styled.p`
    font-size: ${fontSize.Body.medium.fontSize};
    font-weight: ${fontSize.Body.medium.fontWeight};
    line-height: ${fontSize.Body.medium.lineHeight};
    color: ${color.red700};
`;

const MyContentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const MyContentFlex = styled.div`
    max-width: 100%;
    width: auto;
    padding: 16px 24px;
    background-color: ${color.white};
    border-radius: 5px;
`;

const MyContent = styled.p`
    font-size: ${fontSize.Body.medium.fontSize};
    font-weight: ${fontSize.Body.medium.fontWeight};
    line-height: ${fontSize.Body.medium.lineHeight};
    color: ${color.gray950};
`;