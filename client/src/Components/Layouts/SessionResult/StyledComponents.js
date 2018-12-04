import styled from "styled-components";

const SessionResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
  margin-bottom: 72px;
  
`;

const PageTitle = styled.h1`
  font-size: 32px;
  color: var(--main-heading);
  display: inline-block;
  margin-left: 5%;
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--tabs-border);
  border-radius: 3px;
  width: 100%;
  margin: 0 auto;
  height: 50px;
  overflow: hidden;
  cursor: pointer;
`;

const Tab = styled.button`
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
width: 50%;
padding: 0 6px 0 17px;
text-align: center;
background-color: ${props => (props.active ? "var(--active-tab-background)" : "var(--normal-tab-background)")};
color: ${props => (props.active ? "var(--active-tab-text)" : "var(--button-text-color)")};
outline: none;
border: none;
z-index: 2;
font-weight: 900;
`;

const StatisticsWrapper = styled.div`
  width: 100%;
  background-color: var(--statistics-div);
  margin: 0;
  margin: 32px auto;
  border-radius: 3px;
  color: #fff;
  padding: 3px 0;
`;

const StatisticsText = styled.p`
  display: block;
  padding: 4px 11px;
`;

const StatisticsSpan = styled.span`
  font-weight: 900
  margin-right: 10px

`;

const SmallTitle = styled.h3`
  margin: 0 0 8px;
`;

const QuestionWrapper = styled.div`
  width: 100%;
  background-color: var(--light-div);
  margin: 0;
  margin: 20px auto;
  border-radius: 3px;
  color: #fff;
  margin: 0 auto 5px;
  position: relative;
  color: var(--button-text-color);
  padding: 0 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 14px;
  min-height: 70px
`;

const QuestionText = styled.p`
  font-weight: 900;
  color: var(--button-text-color);
`;

const Triangle = styled.div`
  width: 30px;
  height: 30px;
  border-left: 20px solid var(--small-button);
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-radius: 3px;
`;

const Inline = styled.div`
  display: inline-block;
`;

const PopupWrapper = styled.div`
  position: absolute;
  width: 95%;
  top: 75px;
  background-color: #eff3f4;
  z-index: 3;
  border-radius: 3px;
  min-height: 50%;
`;

const XButton = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--button-text-color);
  transform: translate(18%, -50%);
  right: 0;
  text-align: center;
  line-height: 50px;
  font-size: 50px;
  color: #fff;
`;

const PopupQuestion = styled.p`
  font-weight: 900;
  padding: 0 29px 0 15px;
  font-size: 20px;
`;

const RadioRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid #666666;
`;
const Paragraph = styled.p`
  width: ${props => (props.counter ? "25%" : "75%")};
  display: flex;
  align-items: center;
  justify-content: ${props => (props.counter ? "center" : "flex-start")};
  margin: 0;
  ${props => (props.counter ? "" : "border-right: 1px solid black")};
  padding: ${props => (props.counter ? "0" : "20px 10px")};
`;

const StarsWrapper = styled.div`
  width: 90%;
  margin: 5px auto 35px;
`;

const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px
`;

const BarTitle = styled.h2`
  font-size: 24px;
  color: var(--main-heading);
  display: inline-block;
  font-weight: 100;
`;

const BarContainer = styled.div`
  width: 150px;
  height: 20px;
  border: 1px solid var(--statistics-borders);
  border-radius: 0% 30px 30px 0%;
  position: relative;
`;

const P = styled.p`
font-weight: 700;
display: inline-block;
margin: 0;
margin-top : .2rem;
font-size: .9rem;
`;

const Bar = styled.div`
  background-color: var(--button-text-color);
  width: ${props => (props.width / 6) * 100}%;
  height: 100%;
  border-radius: 0% 30px 30px 0%;
  color: #fff;
  font-weight: 900;
  line-height: 30px;
  text-align: center;
`;

const BarSpan = styled.span`
  font-size:.8rem;
  font-family:sans-serif;
  float:right;  
  color: var(--button-text-color);
`;

const StarsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
`;

const Responses = styled.p`
  display: inline-block;
  margin: 10px 0;
`;

const StarIconsWrapper = styled.div``;

const StarIcon = styled.i`
  margin: 0 2px;
  color:var(--golden)
`;

const Answer = styled.p`
  padding: 16px 0 28px;
  border-bottom: 1px solid #666666;
  width: 90%;
  margin: auto;
`;

const IndividualWrapper = styled.div`
  margin-top: 25px;
  background-color: #eff3f4;
  padding-bottom: 50px;
`;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 36%;
  margin: 20px auto 0;
  text-align: center;
`;

const Arrow = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-${props => props.direction}: 20px solid var(--small-button);
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-radius: 5px;
  cursor: pointer
`;

const ResponseCounter = styled.i``;

const IndividualQuestion = styled.div`
  padding: 20px 11px 10px;
  text-align: justify;
  font-weight: 100;
  margin-bottom: 0;
  line-height: 26px;
  border-bottom: 1px solid #666666;
`;

const QuestionSpan = styled.span`
  font-weight: 900;
  font-size: 21px;
  margin-right: 8px;
`;

const IndividualAnswer = styled.p`
  padding: 6px 0;
  width: 90%;
  color: var(--button-text-color);
`;

const MatrixAnswer = styled.p`
  padding: 16px 0 0;
  width: 90%;
  margin: auto;
  color: var(--button-text-color);
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 50px;
  font-size: 28px;
`;
const MatrixRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
`;
const SubQuestionWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;


const OptionValue = styled.span`
  font-weight: 900;
  font-size: 1.4em
`;

export {
  SessionResultWrapper,
  PageTitle,
  TabsWrapper,
  Tab,
  StatisticsWrapper,
  StatisticsText,
  StatisticsSpan,
  SmallTitle,
  QuestionWrapper,
  QuestionText,
  Triangle,
  Inline,
  PopupWrapper,
  XButton,
  PopupQuestion,
  RadioRow,
  Paragraph,
  StarsWrapper,
  BarWrapper,
  BarTitle,
  BarContainer,
  P,
  Bar,
  BarSpan,
  StarsRow,
  Responses,
  StarIconsWrapper,
  StarIcon,
  Answer,
  IndividualWrapper,
  NavigationWrapper,
  Arrow,
  ResponseCounter,
  QuestionSpan,
  IndividualQuestion,
  IndividualAnswer,
  MatrixAnswer,
  Error,
  SubQuestionWrapper,
  OptionValue,
  MatrixRow,
};
