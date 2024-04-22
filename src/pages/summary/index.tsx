import { styled } from "styled-components";

export const SummaryPage = () => {
    return (
        <Section>
            <TextFlex></TextFlex>
        </Section>
    );
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: calc(100vh - 105px);
`;

const TextFlex = styled.div`
    width: 70%;
`;