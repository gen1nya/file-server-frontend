import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 0.6em 1.2em;
    border-radius: 8px;
    border: none;
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.accentHover};
    }
`;

export const Button = ({ children, ...props }: any) => (
    <StyledButton {...props}>{children}</StyledButton>
);