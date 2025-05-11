import pxToRem from '@utils/pxToRem';
import { css } from 'styled-components';

//타이포 정리
const bodyBaseFontStyles = css`
  font-family: 'Pretendard Variable';
  line-height: 120%;
`;

const bodyStyles = {
  Body1: css`
    ${bodyBaseFontStyles}
    font-size: ${pxToRem(36)};
  `,
  Body2: css`
    ${bodyBaseFontStyles}
    font-size: ${pxToRem(28)};
    font-weight: 700;
    letter-spacing: -1px;
  `,
  Body3: css`
    ${bodyBaseFontStyles}
    font-size: ${pxToRem(24)};
    letter-spacing: 0.72px;
  `,
  Body4: css`
    ${bodyBaseFontStyles}
    font-size: ${pxToRem(21)};
    font-weight: 700;
    line-height: 100%;
  `,
  Body5: css`
    ${bodyBaseFontStyles}
    font-size: ${pxToRem(18)};
    letter-spacing: 0.36px;
  `,
  Body6: css`
    ${bodyBaseFontStyles}
    font-size: ${pxToRem(16)};
    font-weight: 400;
    letter-space: -0.2px;
  `,
  Body7: css`
    ${bodyBaseFontStyles}
    font-size: ${pxToRem(14)};
    font-weight: 400;
    letter-spacing: -0.6px;
  `,
  Body8: css`
    ${bodyBaseFontStyles}
    font-size: ${pxToRem(12)};
    font-weight: 700;
    letter-space: -0.3px;
  `,
};

const fontStyles = {
  ...bodyStyles,
};

export default fontStyles;
