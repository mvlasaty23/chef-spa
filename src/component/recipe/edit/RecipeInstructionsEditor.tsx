import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Editor, Node, Path, Text, Transforms } from 'slate';
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';

enum TYPE {
  unorderedList = 'unorderedList',
  orderedList = 'orderedList',
  listItem = 'listItem',
  paragraph = 'paragraph',
  link = 'link',
}
export function RecipeInstunctrionsEditor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [instructions, setInstructions] = useState([
    {
      type: TYPE.paragraph,
      children: [
        {
          text: 'Just a paragraph',
        },
      ],
    },
    {
      type: TYPE.link,
      href: 'https://google.com',
      children: [{ text: 'A hyperlink' }],
    },
    {
      type: TYPE.paragraph,
      children: [
        {
          text: 'Just a paragraph2',
        },
      ],
    },
    {
      type: TYPE.unorderedList,
      children: [
        {
          type: TYPE.listItem,
          children: [{ text: 'A line of text in a paragraph.' }],
        },
        {
          type: TYPE.listItem,
          children: [{ text: 'A line of text in a paragraph2.' }],
        },
      ],
    },
    {
      type: TYPE.orderedList,
      children: [
        {
          type: TYPE.listItem,
          children: [{ text: 'No1' }],
        },
        {
          type: TYPE.listItem,
          children: [{ text: 'No2' }],
        },
      ],
    },
  ] as Node[]);
  const renderElement = useCallback((props: RenderElementProps) => {
    let renderer = elements[props.element.type as keyof typeof TYPE];
    if (!renderer) {
      renderer = elements.paragraph;
    }
    return renderer(props);
  }, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey && event.key === 'Enter') {
      // double enter should split
      event.preventDefault();
      insertParagraph(editor);
      return;
    }
    if (!event.ctrlKey) {
      return;
    }
    // TODO: implement getLeaf for toggles
    switch (event.key) {
      case 'b':
        event.preventDefault();
        toggleBold(editor);
        break;
      case 'i':
        event.preventDefault();
        toggleItalic(editor);
        break;
      case 'k':
        event.preventDefault();
        toggleStrikeThrough(editor);
        break;
      case 'u':
        event.preventDefault();
        toggleUnderline(editor);
        break;
    }
  };
  return (
    <Slate editor={editor} value={instructions} onChange={newInstructions => setInstructions(newInstructions)}>
      <Editable renderLeaf={renderLeaf} renderElement={renderElement} onKeyDown={handleKeyDown} />
    </Slate>
  );
}

// Commands
function getNode(editor: Editor, path: Path) {
  return Node.get(editor, path);
}
function toggleListElement(arr: string[], str: string) {
  if(!arr || !Array.isArray(arr)) {
    return [str];
  } else if(arr.findIndex(el => el === str) > -1){
    return arr.filter(el => el !== str);
  } else {
    return arr.concat(str);
  }
}
function toggleBold(editor: Editor & ReactEditor) {
  const node = getNode(editor, editor.selection!.anchor.path)
  Transforms.setNodes(editor, { bold: node.bold ? false : true }, { match: n => Text.isText(n), split: true });
}
function toggleItalic(editor: Editor & ReactEditor) {
  const node = getNode(editor, editor.selection!.anchor.path)
  Transforms.setNodes(editor, { italic: node.italic ? false : true }, { match: n => Text.isText(n), split: true });
}
function toggleStrikeThrough(editor: Editor & ReactEditor) {
  const LINE_THROUGH = 'line-through';
  const node = getNode(editor, editor.selection!.anchor.path)
  setTextDecoration(editor, toggleListElement(node.textDecoration as string[], LINE_THROUGH));
}
function toggleUnderline(editor: Editor & ReactEditor) {
  const UNDER_LINE = 'underline';
  const node = getNode(editor, editor.selection!.anchor.path)
  setTextDecoration(editor, toggleListElement(node.textDecoration as string[], UNDER_LINE));
}
function setTextDecoration(editor: Editor, textDecoration: string[]){
  Transforms.setNodes(editor, { textDecoration }, { match: n => Text.isText(n), split: true });
}
function insertParagraph(editor: Editor & ReactEditor) {
  Transforms.insertNodes(
    editor,
    { type: TYPE.paragraph, children: [{ text: '' }] },
    { at: [editor.selection!.anchor.path[0] + 1] }
  );
  Transforms.select(editor, [editor.selection!.anchor.path[0] + 1]);
}
// RENDERER
const elements: { [K in keyof typeof TYPE]: (props: RenderElementProps) => JSX.Element } = {
  paragraph: (props: RenderElementProps) => <p {...props.attributes}>{props.children}</p>,
  orderedList: (props: RenderElementProps) => <ol {...props.attributes}>{props.children}</ol>,
  unorderedList: (props: RenderElementProps) => <ul {...props.attributes}>{props.children}</ul>,
  listItem: (props: RenderElementProps) => <li {...props.attributes}>{props.children}</li>,
  link: (props: RenderElementProps) => (
    <a {...props.attributes} href={props.element.href as string}>
      {props.children}
    </a>
  ),
};

const Leaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        fontStyle: props.leaf.italic ? 'italic' : 'normal',
        textDecoration: props.leaf.textDecoration ? ((props.leaf.textDecoration as string[]).join(' ')) : 'initial',
      }}
    >
      {props.children}
    </span>
  );
};
