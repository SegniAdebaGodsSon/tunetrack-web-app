import React from 'react';
import styled from '@emotion/styled';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    padding: ${({ theme }) => `${theme.space[2]}px  ${theme.space[3]}px`};
    margin: 0 ${({ theme }) => theme.space[1]}px;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.light};
    cursor: pointer;
    &:disabled {
        background-color: ${(props) => props.theme.colors.secondary};
        cursor: not-allowed;
    }
`;

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <PaginationContainer>
            <PaginationButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </PaginationButton>
            <span>{currentPage} / {totalPages}</span>
            <PaginationButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages <= 1}>
                Next
            </PaginationButton>
        </PaginationContainer>
    );
};

export default Pagination;
