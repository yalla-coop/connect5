import React, { Component } from "react";
import PropTypes from "prop-types";

import findRate from "./find_rate";
import getOptions from "./get_options";

import {
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
} from "../StyledComponents";


class Stars extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string,
    })),
    options: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    answers: [],
    options: [],
  };

  state = {
    options: [],
  }

  componentDidUpdate(prevProps) {
    const { answers, options: rawOptions } = this.props;
    if (prevProps.answers !== answers) {
      const { options } = getOptions(answers, rawOptions, true);
      this.setState({
        options,
      });
    }
  }

  render() {
    const { answers } = this.props;
    const { options } = this.state;
    const rate = answers && findRate(answers);

    return (
      <StarsWrapper>
        <BarWrapper>
          <BarTitle>
            Overall
          </BarTitle>
          <BarContainer>
            <Bar width={rate}><P>{rate}</P></Bar>
            <BarSpan>out of 6</BarSpan>
          </BarContainer>
        </BarWrapper>
        {options.map((option, index) => (
          <StarsRow>
            <StarIconsWrapper>
              {
                Array(...Array(6 - index)).map(item => (
                  <StarIcon className="fas fa-star" key={item} />
                ))
              }
            </StarIconsWrapper>
            <Responses>
              {option.cummulative}
              {"  "}
              response(s)
            </Responses>
          </StarsRow>
        ))}
      </StarsWrapper>
    );
  }
}

export default Stars;
