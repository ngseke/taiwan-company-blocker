import CodeMirror from '@uiw/react-codemirror'
import { type Nullish } from '../types/Nullish'
import { useMemo } from 'react'
import { EditorView } from '@codemirror/view'
import { rulesLanguage } from '../modules/codeMirror'
import { codeMirrorTheme } from '../modules/codeMirrorTheme'
import { type PropsWithTestId } from '../types/PropsWithTestId'

type EditorProps = PropsWithTestId & {
  value: Nullish<string>
  onChange?: (value: string) => void
  disabled?: boolean
  height?: number | 'auto'
  lineWrapping?: boolean
}

export function Editor ({
  value,
  onChange,
  disabled,
  height = 300,
  lineWrapping,
  testId,
}: EditorProps) {
  const extensions = useMemo(() => [
    rulesLanguage,
    codeMirrorTheme,
    ...(lineWrapping ? [EditorView.lineWrapping] : []),
  ], [lineWrapping])

  return (
    <CodeMirror
      data-testid={testId}
      editable={!disabled}
      extensions={extensions}
      height={typeof height === 'string' ? height : `${height}px`}
      indentWithTab={false}
      theme="none"
      value={value ?? undefined}
      onChange={onChange}
    />
  )
}
