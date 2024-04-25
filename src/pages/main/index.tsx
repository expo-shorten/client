import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { color, fontSize } from "../../styles/theme";

export const MainPage = () => {

    const [videoState, setVideoState] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [file, setFile] = useState<FileList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [preview, setPreview] = useState("");
    const [title, setTitle] = useState<string>("");
    const navigate = useNavigate();

    const handleLoading = (e: any) => {
        setLoading(true)
        if (e !== null && e.length > 0) {
            const file = e[0];
            if (file !== null) {
                setFile(e[0]);
                setInput(e[0].name);
                setTitle(e[0].name);
                const link = window.URL.createObjectURL(e[0])
                setPreview(link)

            }
            setVideoState(true);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000)
    }

    const handleClose = () => {
        setFile(null);
        setInput("");
        setVideoState(false);
    }

    const handleSummary = () => {
        if (input) {
            if (file) {
                navigate('/summary', { state: { files: file } })
            } else {
                navigate('/summary', { state: { inputs: input } })
            }
        } else {
            alert("유튜브 영상 및 영상 업로드를 해주세요.")
        }
    }

    return (
        <Section video={videoState}>
            <Title>영상 요약하기</Title>
            <InputFlex>
                <VideoInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="여기에 동영상 링크 붙여넣기" />
                <UploadLabel htmlFor='file'>업로드</UploadLabel>
                <UploadInput id="file" type='file' accept="video/*" onChange={(e) => handleLoading(e.target.files)} />
                <Button onClick={handleSummary}>요약</Button>
            </InputFlex>
            <TextFlex>
                <Span>유튜브</Span>
                <Txt>영상 및 각 종 </Txt>
                <div style={{ display: "flex" }}>
                    <Span>영상</Span>
                    <Txt>에 주요 내용을 내용을 요약해 줍니다! 간편하게 요약한 내용에 대해 질문해보세요!!</Txt>
                </div>
            </TextFlex>
            {videoState &&
                <>
                    {loading ?
                        <LodingFlex>
                            <LodingTxt>요약할 영상을 처리하고 있습니다.</LodingTxt>
                            <LodingImg src="/assets/img/Spinner.gif" />
                        </LodingFlex>
                        :
                        <VideoFlex>
                            <VideoBox>
                                <VideoImg controls src={preview} />
                                <VideoTimeFlex>
                                    <VideoTitleFlex>
                                        <VideoTitle>{title}</VideoTitle>
                                        <VideoClose onClick={handleClose} src="/assets/img/close.svg" />
                                    </VideoTitleFlex>
                                    <VideoSummary onClick={handleSummary}>요약하기</VideoSummary>
                                </VideoTimeFlex>
                            </VideoBox>
                        </VideoFlex>
                    }
                </>
            }
        </Section>
    );
}

const Section = styled.section<{ video: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: ${({ video }) => video ? '100vh' : 'calc(100vh - 105px)'};
`;

const Title = styled.p`
    font-size: ${fontSize.Headline.medium.fontSize};
    font-weight: ${fontSize.Headline.medium.fontWeight};
    line-height: ${fontSize.Headline.medium.lineHeight};
    background: linear-gradient(45deg, ${color.red500}, ${color.red200});
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin: 120px 0 60px 0;
`;

const InputFlex = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    width: 70%;
    display: flex;
    justify-content: space-around;
`;

const VideoInput = styled.input`
    width: 75%;
    height: 60px;
    padding: 24px;
    font-size: ${fontSize.Body.medium.fontSize};
    font-weight: ${fontSize.Body.medium.fontWeight};
    line-height: ${fontSize.Body.medium.lineHeight};
    border: 2px solid ${color.red400};
    border-radius: 5px;
    outline: none;
    box-shadow: 0 4px 4px ${color.red200};
    color: ${color.gray950};

    &::placeholder{
        color: ${color.gray400};
    }

`;

const UploadLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 14px;
    min-width: 80px;
    font-size: ${fontSize.Body.medium.fontSize};
    font-weight: ${fontSize.Body.medium.fontWeight};
    line-height: ${fontSize.Body.medium.lineHeight};
    border: 2px solid ${color.red400};
    border-radius: 5px;
    box-shadow: 0 4px 4px ${color.red200};
    color: ${color.gray950};
    background-color: ${color.white};
    cursor: pointer;

    &:active{
        transition: 0.3s all;
        filter: brightness(0.95);
    }
`;

const UploadInput = styled.input`
    display: none;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 14px;
    min-width: 80px;
    font-size: ${fontSize.Body.medium.fontSize};
    font-weight: ${fontSize.Body.medium.fontWeight};
    line-height: ${fontSize.Body.medium.lineHeight};
    border: 2px solid ${color.red400};
    border-radius: 5px;
    box-shadow: 0 4px 4px ${color.red200};
    color: ${color.gray950};
    background-color: ${color.white};
    cursor: pointer;

    &:active{
        transition: 0.3s all;
        filter: brightness(0.95);
    }
`;

const TextFlex = styled.div`
    display: flex;
    gap: 8px;
    width: 70%;
    min-width: 700px;
    margin-top: 10px;
    font-size: ${fontSize.Body.small.fontSize};
    font-weight: ${fontSize.Body.small.fontWeight};
    line-height: ${fontSize.Body.small.lineHeight};
`;

const Span = styled.div`
    color: ${color.red400};
`;

const Txt = styled.div`
    color: ${color.gray950};
`;

const LodingFlex = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
`;

const LodingTxt = styled.p`
    font-size: ${fontSize.Body.large.fontSize};
    font-weight: ${fontSize.Body.large.fontWeight};
    line-height: ${fontSize.Body.large.lineHeight};
    color: ${color.gray700};
`;

const LodingImg = styled.img`
    width: 32px;
`;

const VideoFlex = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    margin-top: 100px;
`;

const VideoBox = styled.div`
    display: flex;
    width: 700px;
    height: 250px;
    background-color: ${color.white};
    border: 1px solid ${color.gray400};
    border-radius: 5px;
`;

const VideoImg = styled.video`
    width: 50%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
`;

const VideoTimeFlex = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 12px;
`;

const VideoTitleFlex = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: space-between;
`;


const VideoTitle = styled.p`
    width: 100%;
    height: 100%;
    color: ${color.gray950};
    font-size: ${fontSize.Body.small.fontSize};
    font-weight: ${fontSize.Body.small.fontWeight};
    line-height: ${fontSize.Body.small.lineHeight};
`;

const VideoClose = styled.img`
    cursor: pointer;
    width: 24px;
    height: 24px;
`;

const VideoSummary = styled.button`
    cursor: pointer;
    width: 100%;
    height: 40px;
    background-color: ${color.white};
    border: 1px solid ${color.red400};
    border-radius: 5px;
    font-size: ${fontSize.Label.medium.fontSize};
    font-weight: ${fontSize.Label.medium.fontWeight};
    line-height: ${fontSize.Label.medium.lineHeight};
    color: ${color.gray700};
`;