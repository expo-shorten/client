import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { Hedaer } from "../components/header";
import { color } from "../styles/theme";

export const Layout = () => {
    return (
        <Warpper>
            <Hedaer />
            <Container>
                <Outlet />
            </Container>
        </Warpper>
    );
}

const Warpper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 500px;
    background: linear-gradient(360deg, ${color.gray200}, ${color.white});
`;

const Container = styled.div`
    width: 70%;
`;