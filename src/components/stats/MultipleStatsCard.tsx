import styled from "@emotion/styled";
import { Statistic } from "../StatisticsPage";

interface Props {
    name: string;
    stats: Statistic[];
}

const Card = styled.div`
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    padding: ${({ theme }) => `${theme.space[3]}px ${theme.space[4]}px`};
    border-radius: 0.5em;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    transition: all ${props => props.theme.transitions.duration} ${props => props.theme.transitions.easing};

   h3 {
    opacity: 0.6;
    transition: all ${props => props.theme.transitions.duration} ${props => props.theme.transitions.easing};
   }

    &:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); 
        * {
            opacity: 1;
        }
    }
`;

const Li = styled.div`
    display: flex;
    gap: ${props => props.theme.space[2]}px;
    align-items: end;
    padding: ${props => props.theme.space[2]}px ${props => props.theme.space[2]}px;
`;

const Id = styled.p`
    opacity: 0.7;
    transition: all ${props => props.theme.transitions.duration} ${props => props.theme.transitions.easing};
`;

const Stat = styled.p`
    font-size: ${(props) => props.theme.fontSizes[5]}px;
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${(props) => props.theme.colors.primary};
    font-family: ${(props) => props.theme.fonts.heading};
    opacity: 0.7;
    transition: all ${props => props.theme.transitions.duration} ${props => props.theme.transitions.easing};
`;

const MultipleStatsCard: React.FC<Props> = ({ name, stats }) => {
    return (
        <Card>
            <h3>{name}</h3>
            <ul>
                {stats.map(stat => (
                    <Li>
                        <Stat>{stat.count}</Stat>
                        <Id>{stat._id}</Id>
                    </Li>
                ))}
            </ul>
        </Card>
    )
}

export default MultipleStatsCard;
