import styled from "styled-components";

const ResultsOverviewWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 72px;
`;

const PageTitle = styled.h1`
  font-size: 2em;
  color: var(--main-heading);
  display: inline-block;
  margin-bottom: 26px;
`;

const StatisicsContainer = styled.div`
  background-color: var(--light-div);
  border-radius: 3px;
  padding-bottom: 3px;
  min-height: 161px;
  margin-bottom: 18px;

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

const AttendanceResults = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px auto;
`;

const CircleWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  background: var(--small-button);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-size: 20px

`;
const CircleTitle = styled.span`
  text-align: center;
  margin-top: 8px;
  display: block;
  padding: 0 5px;
`;

const CircleNumber = styled.span``;

const SmallTitle = styled.h3``;

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
  &:last-child{
    margin-bottom: 100px;
  }
`;

const QuestionText = styled.p`
  font-weight: 900;
`;

const Triangle = styled.div`
  width: 30px;
  height: 30px;
  border-left: 20px solid var(--small-button);
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-radius: 3px;
`;

const PopupWrapper = styled.div`
  position: absolute;
  width: 90%;
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
  padding: 0 35px;
  font-size: 18px;
`;

const StarsWrapper = styled.div`
  width: 90%;
  margin: 5px auto 10px;
`;

const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BarTitle = styled.h2`
  font-size: 16px;
  color: var(--main-heading);
  display: inline-block;
  font-weight: 900;
`;

const BarContainer = styled.div`
  width: 150px;
  height: 20px;
  border: 1px solid var(--statistics-borders);
  border-radius: 0% 30px 30px 0%;
  position: relative;
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

const Responses = styled.p`
  display: inline-block;
  margin: 10px 0;
`;
const P = styled.p`
font-weight: 700;
  display: inline-block;
  margin: 0;
  margin-top : .2rem;
  font-size: .9rem;
`;

const ResponsesResults = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 12px auto;
`;


export {
  ResultsOverviewWrapper,
  PageTitle,
  StatisicsContainer,
  ResponsesResults,
  TabsWrapper,
  Tab,
  AttendanceResults,
  Circle,
  CircleWrapper,
  CircleTitle,
  CircleNumber,
  SmallTitle,
  QuestionWrapper,
  QuestionText,
  Triangle,
  PopupWrapper,
  XButton,
  PopupQuestion,
  StarsWrapper,
  BarWrapper,
  BarTitle,
  BarContainer,
  Bar,
  BarSpan,
  Responses,
  P,
};