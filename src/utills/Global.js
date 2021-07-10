import {createGlobalStyle} from 'styled-components';
import {normalize} from 'polished';
import {primaryFont} from './Typography';

export const GlobalStyle = createGlobalStyle`
    ${normalize()}
    html{
        font-size: 16px;
        box-sizing: border-box;
    }
    
    *,*::before,*::after{
        box-sizing: inherit;
    }
    body {
        margin: 0;
        font-family: ${primaryFont};
    }
`;