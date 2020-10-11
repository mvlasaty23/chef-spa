import { IconButton } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Editor, Node, Path, Text, Transforms } from 'slate';
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from 'slate-react';

enum TYPE {
  unorderedList = 'unorderedList',
  orderedList = 'orderedList',
  listItem = 'listItem',
  paragraph = 'paragraph',
  link = 'link',
  quote = 'quote',
  heading1 = 'heading1',
  heading2 = 'heading2',
  heading3 = 'heading3'
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
      type: TYPE.quote,
      children: [{ text: 'This is a quote' }],
    },
    {
      type: TYPE.heading1,
      children: [{ text: 'Heading 1' }],
    },
    {
      type: TYPE.heading2,
      children: [{ text: 'Heading 2' }],
    },
    {
      type: TYPE.heading3,
      children: [{ text: 'Heading 3' }],
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
    if (!renderer) { // Defaulting to a paragraph
      renderer = elements.paragraph;
    }
    return renderer(props);
  }, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey) {
      handleAltKey(editor, event);
    } else if (event.ctrlKey) {
      handleCtrlKey(editor, event);
    } else if(event.key === 'Escape') {
      setStyleButtonVisible(false);
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setStyleButtonVisible(false);
  };
  const [styleButtonVisible, setStyleButtonVisible] = useState(false);
  const [styleButtonCoordinates, setStyleButtonCoordinates] = useState({x:0,y:0});
  useEffect(() => {
    const contextMenutListener = (event: MouseEvent) => {
      event.preventDefault();
      setStyleButtonCoordinates({x: event.pageX, y: event.pageY});
      setStyleButtonVisible(true);
    }; 
    document.addEventListener("contextmenu", contextMenutListener);
    return () => document.removeEventListener("contextmenu", contextMenutListener);
  });
  return (
    <Slate editor={editor} value={instructions} onChange={newInstructions => setInstructions(newInstructions)}>
      <ElementStyleButton visible={styleButtonVisible} x={styleButtonCoordinates.x} y={styleButtonCoordinates.y} />
      <Editable onClick={handleClick} renderLeaf={renderLeaf} renderElement={renderElement} onKeyDown={handleKeyDown} />
    </Slate>
  );
}

function ElementStyleButton(options: {visible: boolean, x: number, y: number}) {
  return(
    <div style={{visibility: options.visible ? 'visible' : 'hidden', position: 'fixed', left: options.x, top: options.y/*, marginLeft: '-24px', marginTop: '-24px'*/}}>
      <IconButton aria-label="add">
        <AddCircle />
      </IconButton>
    </div>
  );
}

// Handler
type KeyCommandMap = {[k: string]: (e: Editor & ReactEditor) => void};
function handleAltKey(editor: Editor & ReactEditor, event: React.KeyboardEvent<HTMLDivElement>) {
  const keyMap: KeyCommandMap = {
    Enter: insertParagraph
  };
  const command = keyMap[event.key];
  if(command) {
    event.preventDefault();
    command(editor);
  }
}
function handleCtrlKey(editor: Editor & ReactEditor, event: React.KeyboardEvent<HTMLDivElement>) {
  const keyMap: KeyCommandMap = {
    b: toggleBold,
    i: toggleItalic,
    k: toggleStrikeThrough,
    u: toggleUnderline
  };
  const command = keyMap[event.key];
  if (command) {
    event.preventDefault();
    command(editor);
  }
}
// Commands
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
function insertParagraph(editor: Editor & ReactEditor) {
  Transforms.insertNodes(
    editor,
    { type: TYPE.paragraph, children: [{ text: '' }] },
    { at: [editor.selection!.anchor.path[0] + 1] }
  );
  Transforms.select(editor, [editor.selection!.anchor.path[0] + 1]);
}

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
function setTextDecoration(editor: Editor, textDecoration: string[]){
  Transforms.setNodes(editor, { textDecoration }, { match: n => Text.isText(n), split: true });
}
// Renderer
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
  quote: (props: RenderElementProps) => <q {...props.attributes}>{props.children}</q>,
  heading1: (props: RenderElementProps) => <h1 {...props.attributes}>{props.children}</h1>,
  heading2: (props: RenderElementProps) => <h2 {...props.attributes}>{props.children}</h2>,
  heading3: (props: RenderElementProps) => <h3 {...props.attributes}>{props.children}</h3>,
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
