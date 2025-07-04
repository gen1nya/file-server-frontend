import styled from 'styled-components';

const Label = styled.label`
    display: block;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
`;

export const Input = ({ label, ...props }: any) => (
    <Label>
        <div>{label}</div>
        <StyledInput {...props} />
    </Label>
);