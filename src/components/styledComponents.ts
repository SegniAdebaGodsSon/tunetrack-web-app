import styled from '@emotion/styled';

export const PageHeader = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.heading};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: end; 
    gap: 0.5em;
    margin: 0 auto;
    padding: 3em 2em 1.5em;
    padding: ${({ theme }) => `${theme.space[5]}px ${theme.space[5]}px ${theme.space[3]}px`};
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: ${props => props.theme.space[3]}px;
`;

export const Label = styled.label`
    margin-bottom: ${props => props.theme.space[2]}px;
    margin-right: ${props => props.theme.space[3]}px;
`;

export const Input = styled.input`
    padding: ${props => props.theme.space[2]}px;
    font-size: ${props => props.theme.fontSizes[2]}px;
    border: 1px solid ${(props) => props.theme.colors.secondary};
    border-radius: 4px;
    transition: border-color 0.3s ease; 

    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
      outline: none; 
      box-shadow: 0 0 2px ${(props) => props.theme.colors.primary}; 
    }
`;

export const PrimaryButton = styled.button`
    padding: ${props => props.theme.space[2]}px;
    font-size: ${props => props.theme.fontSizes[2]}px;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.light};
    cursor: pointer;
    align-self: flex-end; 
`;

export const ErrorMessage = styled.div`
    color: ${(props) => props.theme.colors.danger};
    margin: 0 auto;
`;