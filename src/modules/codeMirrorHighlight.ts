import { RangeSetBuilder } from '@codemirror/state'
import { ViewPlugin, type DecorationSet, type EditorView, type ViewUpdate, Decoration } from '@codemirror/view'

export function codeMirrorHighlight (lineNumber: number) {
  return ViewPlugin.fromClass(class {
    decorations: DecorationSet

    constructor (view: EditorView) {
      this.decorations = this.createDecoration(view)
    }

    update (update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.createDecoration(update.view)
      }
    }

    createDecoration (view: EditorView) {
      const builder = new RangeSetBuilder<Decoration>()
      const doc = view.state.doc
      if (lineNumber < 1 || lineNumber > doc.lines) {
        return builder.finish()
      }
      const line = doc.line(lineNumber)
      builder.add(
        line.from,
        line.from,
        Decoration.line({ class: 'highlight-line' })
      )
      return builder.finish()
    }
  }, {
    decorations: (v) => v.decorations,
  })
}
