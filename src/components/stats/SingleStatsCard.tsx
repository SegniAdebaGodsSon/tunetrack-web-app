import styled from "@emotion/styled";

interface SingleStatsCardProps {
    icon: string;
    title: string;
    value: number;
}

const Icon = styled.img`
    height: 3em;
    width: 3em;
    opacity: 0.6;
    transition: opacity 0.3s ease;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3em; 

    padding: 2em 3em;

    border-radius: 1em;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

   transition: all ${props => props.theme.transitions.duration} ${props => props.theme.transitions.easing};

    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); 
        img {
            opacity: 0.8;
        }

        p, h1 {
            opacity: 1;
        }
    } 

`;

const Value = styled.h1`
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${(props) => props.theme.colors.primary};
    font-family: ${(props) => props.theme.fonts.heading};
    transition: all ${props => props.theme.transitions.duration} ${props => props.theme.transitions.easing};
    opacity: 0.7;
`;

const Title = styled.p`
    font-size: ${props => props.theme.fontSizes[2]};
    font-weight: ${props => props.theme.fontWeights.medium};
    opacity: 0.7;
    transition: all ${props => props.theme.transitions.duration} ${props => props.theme.transitions.easing};
`;

const SingleStatsCard: React.FC<SingleStatsCardProps> = ({ icon, title, value }) => {
    return (
        <Container>
            <div>
                <Value>{value}</Value>
                <Title>{title}</Title>
            </div>
            <div>
                <Icon src={icon} alt="Card icon" />
            </div>
        </Container>
    )
}

export default SingleStatsCard;