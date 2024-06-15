import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"
import config from '../config/config'

const RTE = ({ label, name, control, defaultValue = '' }) => {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                control={control}
                name={name || 'content'}
                render={({ field: { onChange } }) => (
                    <Editor
                    apiKey={config.tinymceApiKey}
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onEditorChange={onChange} />
                )}
            />
        </div>
    )
}
export default RTE