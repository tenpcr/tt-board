/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function InputCKeditor({
  value,

  onChange,

  height,
  resize,
  onReady,
}: any) {
  return (
    <>
      <div className="relative bg-white w-full">
        <CKEditor
          editor={ClassicEditor as any}
          config={{
            toolbar: [
              "undo",
              "redo",
              "|",
              "fontsize",
              "fontcolor",
              "fontbackgroundcolor",
              "|",
              "bold",
              "italic",
              "underline",
              "|",
              "numberedList",
              "bulletedList",
              "link",
              "|",
              "removeformat",
            ],
          }}
          data={value}
          onReady={(editor) => {
            if (onReady) {
              onReady(editor);
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();

            if (onChange) {
              onChange(data);
            }
          }}
          onBlur={(event, editor) => {}}
          onFocus={(event, editor) => {}}
        />
      </div>

      <style jsx={true} global={true}>{`
        .styleAutoH {
          resize: vertical;
          min-height: 1em;
          overflow: hidden !important;
        }

        .ck {
          border: 1px solid #e1e1e1;
        }

        .ck-content {
          border: 1px solid #e1e1e1;
        }

        .ck-editor__main {
          border: 1px solid #e1e1e1;
        }

        .ck .ck-editor__main > .ck-editor__editable {
          border-radius: 20px;
          min-height: ${height ? height : "150px"};
          ${resize
            ? `min-height: ${height ? height : "150px"}`
            : `height: calc(100vh - 95px)`}
          background: #ffffff;
          border: none !important;
          outline: none !important;
          font-size: 16px;
          padding: 0px 16px;
          box-shadow: none !important;
        }

        .ck-editor__editable a {
          color: #0093ee;
          text-decoration: underline;
        }

        .ck-editor__editable a:link {
          color: #0093ee;
          text-decoration: underline;
        }

        .ck-focused {
          box-shadow: none !important;
        }

        .ck.ck-content ul,
        .ck.ck-content ul li {
          list-style-type: inherit;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .ck.ck-content ul {
          /* Default user agent stylesheet, you can change it to your needs. */
          padding-left: 40px;
        }

        .ck.ck-content ol,
        .ck.ck-content ol li {
          list-style-type: decimal;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .ck.ck-content ol {
          /* Default user agent stylesheet, you can change it to your needs. */
          padding-left: 40px;
        }
      `}</style>
    </>
  );
}
