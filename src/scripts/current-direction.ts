type ControlsKeys<T> = [T, string[]]
type RunningCurrentDirectionKeyBoard<T> = { 
  keyBoardName: string, 
  controlsKeys: ControlsKeys<T>[]
}

export function runningCurrentDirectionKeyBoard<T>(props: RunningCurrentDirectionKeyBoard<T>) {
  const { controlsKeys, keyBoardName } = props;

  for (const controlKeys of controlsKeys) {
    const isCurrentDirection = controlKeys[1].some(key => key === keyBoardName)
    if (isCurrentDirection) {
      return controlKeys[0]
    }
  }
}