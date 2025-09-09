import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = ({ 
  value, 
  onChange, 
  placeholder = 'Type something...',
  className = '',
  disabled = false,
  height = 400
}) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <div className={className}>
      <Editor
        apiKey='tg54ep9jwj8qr0zt9zf7yvdjyx83sye1uud5v2ctb7ylq1jb'
        onInit={(evt, editor) => editorRef.current = editor}
        value={value || ''}
        onEditorChange={handleEditorChange}
        disabled={disabled}
        init={{
          height: height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
            'template', 'codesample', 'hr', 'pagebreak', 'nonbreaking', 'toc',
            'imagetools', 'textpattern', 'quickbars', 'accordion', 'directionality'
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize | ' +
            'bold italic underline strikethrough | alignleft aligncenter ' +
            'alignright alignjustify | outdent indent |  numlist bullist | ' +
            'forecolor backcolor removeformat | pagebreak | charmap emoticons | ' +
            'fullscreen preview | insertfile image media table link anchor codesample | ' +
            'ltr rtl | code | help',
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; line-height: 1.6; }',
          placeholder: placeholder,
          branding: false,
          promotion: false,
          resize: true,
          statusbar: true,
          elementpath: true,
          contextmenu: 'link image imagetools table spellchecker',
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          quickbars_insert_toolbar: 'quickimage quicktable',
          image_advtab: true,
          image_caption: true,
          image_title: true,
          image_description: true,
          file_picker_types: 'image',
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            
            input.onchange = function () {
              var file = this.files[0];
              var reader = new FileReader();
              reader.onload = function () {
                cb(reader.result, {
                  title: file.name
                });
              };
              reader.readAsDataURL(file);
            };
            
            input.click();
          },
          templates: [
            {
              title: 'New Table',
              description: 'Creates a new table',
              content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
            },
            {
              title: 'Starting my story',
              description: 'A cure for writers block',
              content: 'Once upon a time...'
            },
            {
              title: 'New list with dates',
              description: 'New List with dates',
              content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
            }
          ],
          template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
          template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
          image_caption: true,
          quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
          a11y_advanced_options: true,
          skin: 'oxide',
          content_css: 'default',
          importcss_append: true,
          templates_replace_content: false,
          setup: function (editor) {
            editor.on('change', function () {
              editor.save();
            });
          }
        }}
      />
    </div>
  );
};

export default TinyMCEEditor;
