import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { color, fontSize } from "../styles/theme";

export const Hedaer = () => {
    const navigation = useNavigate()

    return (
        <Headers>
            <img width={150} src="/assets/img/LongLogo.svg" onClick={() => navigation('/')} />
            {/* <GoInstall target={'_blank'} to={'https://chromewebstore.google.com/category/extensions?utm_source=ext_sidebar&hl=ko'}>설치</GoInstall> */}
        </Headers>

    );
}

const Headers = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    padding: 30px 0;
    border-bottom: 1px solid ${color.gray300};
`;

const GoInstall = styled(Link)`
    font-size: ${fontSize.Title.small.fontSize};
    font-weight: ${fontSize.Title.small.fontWeight};
    line-height: ${fontSize.Title.small.lineHeight};
    color: ${color.gray700};
    text-decoration: none;
    padding-top: 10px;
`;