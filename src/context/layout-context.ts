import { createContext } from 'react';

import type { ThemeConfig } from 'antd';
import type { Context, Dispatch, SetStateAction } from 'react';

interface ThemeConfigType extends ThemeConfig {
  isLight?: boolean; // 来判断日间和夜间模式
}

export interface LayoutContextType {
  siderHidden: boolean;
  setSiderHidden?: Dispatch<SetStateAction<boolean>>;
  menuHidden: boolean;
  setMenuHidden?: Dispatch<SetStateAction<boolean>>;
  theme: ThemeConfigType;
  setTheme?: Dispatch<SetStateAction<ThemeConfigType>>;
}

/**
 * 布局的context
 */

const initValue = {
  siderHidden: false,
  menuHidden: false,
  theme: {},
};
const LayoutContext: Context<LayoutContextType> = createContext(initValue);

export default LayoutContext;
