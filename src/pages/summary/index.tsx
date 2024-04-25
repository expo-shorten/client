import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { color, fontSize } from "../../styles/theme";

const BASEURL = process.env.REACT_APP_BASE_URL;

export const SummaryPage = () => {

    const { state } = useLocation();
    const { files, inputs } = state;
    const [summaryData, setSummaryData] = useState<string[]>([]);
    const [originalData, setOriginalData] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        setLoading(true)
        handleGetData()
    }, [])

    const handleGetData = async () => {
        try {
            if (files) {
                let formdata = new FormData();
                formdata.append('video', files);
                const data = await axios.post(`${BASEURL}/upload_video/`, formdata, {
                    headers: {
                        "Contest-Type": "multipart/form-data"
                    }
                });
                console.log(data.data)
                setLoading(false)
                setOriginalData(data.data.response)
                let copy = summaryData;
                copy.push(data.data.summary)
                setSummaryData(copy)
            }
            else if (inputs) {
                const data = await axios.post(`${BASEURL}/upload_url/`, { url: inputs })
                console.log(data.data)
                setLoading(false)
                setOriginalData(data.data.response)
                let copy = summaryData;
                copy.push(data.data.summary)
                setSummaryData(copy)
            }

        }
        catch (err) {
            console.log("에러가 발생하였습니다.");
            console.log(err)
        }

    }

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleQuestion();
        }
    }

    const handleQuestion = async () => {
        await axios.post('')
    }

    const handleCopyText = (e: number) => {
        if (e == 1) {
            navigator.clipboard.writeText(originalData);
        }
        if (e == 2) {
            navigator.clipboard.writeText(summaryData[0]);
        }
    }

    const handleDownloadText = (e: number) => {
        let fileName = '파일이름.txt';
        let output = "";
        if (e == 1) {
            output = originalData;
        }
        if (e == 2) {
            output = summaryData[0];
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
                                <Content readOnly>
                                    {originalData}
                                </Content>
                                <IconFlex>
                                    <Icon onClick={() => handleDownloadText(1)} src="/assets/img/Download.svg" />
                                    <Icon onClick={() => handleCopyText(1)} src="/assets/img/Copy.svg" />
                                </IconFlex>
                                <Content readOnly>
                                    {summaryData[0]}
                                </Content>
                                <IconFlex>
                                    <Icon onClick={() => handleDownloadText(2)} src="/assets/img/Download.svg" />
                                    <Icon onClick={() => handleCopyText(2)} src="/assets/img/Copy.svg" />
                                </IconFlex>
                            </>
                    }
                </AIText>
                {/* <MyText>
                    <MyFlex>
                        <My>나</My>
                    </MyFlex>
                    <MyContentContainer>
                        <MyContentFlex>
                            <MyContent>
                                엄준식에 대해 말해줘 히히 엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히엄준식에 대해 말해줘 히히
                            </MyContent>
                        </MyContentFlex>
                    </MyContentContainer>
                </MyText> */}
            </TextFlex>
            {/* <InputFlex>
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="추가 적인 내용을 원하시면 질문해주세요" onKeyDown={handleKeyDown} />
                <QuestionBtn src="/assets/img/Question.svg" onClick={handleQuestion} />
            </InputFlex> */}
        </Section>
    );
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: calc(100vh - 10vh);
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