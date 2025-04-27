import CodeMirror, { EditorState, type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { type Nullish } from '../types/Nullish'
import { useEffect, useMemo, useRef } from 'react'
import { EditorView } from '@codemirror/view'
import { rulesLanguage } from '../modules/codeMirror'
import { codeMirrorTheme } from '../modules/codeMirrorTheme'
import { type PropsWithTestId } from '../types/PropsWithTestId'
import { codeMirrorHighlight } from '../modules/codeMirrorHighlight'

type EditorProps = PropsWithTestId & {
  value: Nullish<string>
  onChange?: (value: string) => void
  disabled?: boolean
  height?: number | 'auto'
  lineWrapping?: boolean
  highlightText?: Nullish<string>
}

export function Editor ({
  value,
  onChange,
  disabled,
  height = 300,
  lineWrapping,
  testId,
  highlightText,
}: EditorProps) {
  const line = useMemo(() => {
    if (!value) return null
    const index = value?.split('\n').findIndex((item) => item === highlightText)
    return index < 0 ? null : index + 1
  }, [highlightText, value])

  const extensions = useMemo(() => [
    rulesLanguage,
    codeMirrorTheme,
    ...(lineWrapping ? [EditorView.lineWrapping] : []),
    ...(line ? [codeMirrorHighlight(line)] : []),
  ], [line, lineWrapping])

  const ref = useRef<ReactCodeMirrorRef>({})

  const isReady = value != null

  const hasFocused = useRef(false)
  useEffect(() => {
    if (!line || !isReady || hasFocused.current) return

    setTimeout(() => {
      const view = ref.current.view
      const _line = view?.state?.doc.line(line)
      if (!_line) return
      view?.focus()
      view?.dispatch({
        selection: { anchor: _line.from, head: _line.to },
        effects: EditorView.scrollIntoView(_line.from, { y: 'center' }),
      })
      ref.current.editor?.scrollIntoView()
      hasFocused.current = true
    }, 1)
  }, [isReady, line])

  return (
    <CodeMirror
      ref={ref}
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
