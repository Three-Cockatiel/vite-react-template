import { useContext, useEffect, useMemo, useState } from 'react';

import LayoutContext from '@/context/layout-context';

import { DisplayModeEnum } from '@/enums';
import { SYSTEM_NAME } from '@/constants/common';

import { MoonFilled, SunFilled } from '@ant-design/icons';
import { Tooltip, theme } from 'antd';

/**
 * @description 切换模式
 * @author Huang Wenjie
 * @createDate 2024-03-26
 */

const localStorageKey = `${SYSTEM_NAME}_DISPLAY_MODE`;
export default function DisplayMode() {
  const { setTheme } = useContext(LayoutContext);

  const [mode, setMode] = useState(DisplayModeEnum.LIGHT);

  // 首次进入时保留上一次选择
  useEffect(() => {
    const initMode = localStorage?.[localStorageKey];
    if (initMode) {
      setMode(initMode);
    }
  }, []);

  const isLight = useMemo(() => mode === DisplayModeEnum.LIGHT, [mode]);

  // 更改全局模式
  useEffect(() => {
    const algorithm = mode === DisplayModeEnum.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm;
    if (typeof setTheme === 'function') {
      setTheme((old) => ({
        ...old,
        algorithm,
        isLight,
      }));
    }
  }, [isLight, mode, setTheme]);

  const handleClick = () => {
    const setModeVal = mode === DisplayModeEnum.LIGHT ? DisplayModeEnum.DARK : DisplayModeEnum.LIGHT;
    localStorage[localStorageKey] = setModeVal;
    setMode(setModeVal);
  };

  return (
    <Tooltip title={isLight ? '开启夜间模式' : '开启日间模式'}>
      <div
        onClick={handleClick}
        className={`header-mode-icon ${isLight ? 'header-mode-icon-light' : 'header-mode-icon-dark'}`}
      >
        {isLight ? <MoonFilled /> : <SunFilled />}
      </div>
    </Tooltip>
  );
}
