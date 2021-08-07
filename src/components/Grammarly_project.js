import axios from 'axios';
import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import './Grammarly_project.css'

export default class Grammarly_project extends Component {

    constructor(props) {
        super(props);
        console.log("Inside constructor");
        this.state = {
            todos: null,
            status: '',
            text: '',
            errors: [],
            isDataFetched: false
        }
        this.getTodos = this.getTodos.bind(this);
    }
    openFile(evt) {
        let status = []; // Status output
        const fileObj = evt.target.files[0]; // We've not allowed multiple files.
        // See https://developer.mozilla.org/en-US/docs/Web/API/FileReader
        const reader = new FileReader();

        // Defining the function here gives it access to the fileObj constant.
        let fileloaded = e => {
            // e.target.result is the file's content as text
            // Don't trust the fileContents! 
            // Test any assumptions about its contents!
            const fileContents = e.target.result;
            //   status.push(`File name: "${fileObj.name}". ` +
            //               `Length: ${fileContents.length} bytes.`);
            // Show first 80 characters of the file
            //   const first80char = fileContents.substring(0,80);
            status.push(fileContents)
            //   status.push (`First 80 characters of the file:\n${first80char}`)
            // Show the status messages
            this.setState({ status: status.join("\n") });
        }

        // Mainline of the method
        fileloaded = fileloaded.bind(this);
        // The fileloaded event handler is triggered when the read completes
        reader.onload = fileloaded;
        reader.readAsText(fileObj); // read the file
    }

    // componentDidUpdate() {
    //     var params = {
    //         text: this.state.status,
    //         language: "en-GB",
    //         key: "CDHGwWubzmdnip3P"
    //     }
    //     console.log("Inside componentDidMount")
    //     axios.get('https://api.textgears.com/spelling', {
    //         params: params
    //     })
    //         .then((res) => {
    //             // console.log(res.data.response.errors)
    //             var errors = res.data.response.errors
    //             var offset_errors = []
    //             for (let i = 0; i < errors.length; i++) {
    //                 offset_errors.push(errors[i].offset)
    //             }
    //             var output_text = []
    //             // console.log(params.text.split(" "))
    //             var text_split = params.text.split(" ")
    //             var len = 0
    //             for (const [index, element] of text_split.entries()) {
    //                 len += (element.length)
    //                 len += 1
    //                 if (offset_errors.includes(len)) {
    //                     text_split[text_split.indexOf(text_split[index + 1])] = `<span style="color:red;">${text_split[index + 1]}</span>`
    //                     output_text.push(`<span style="color:red;">${text_split[index + 1]}</span>`)
    //                 }
    //                 // console.log(len)
    //             }
    //             // console.log(output_text)
    //             // console.log(text_split)
    //             this.setState({
    //                 text: text_split.join(" "),
    //                 errors: errors,
    //                 isDataFetched: true
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    componentDidUpdate() {
        // console.log(this.state.status)
        this.getTodos();
    }

    async getTodos() {
        // console.log(this.state.status)
        var params = {
            text: this.state.status,
            language: "en-GB",
            key: "CDHGwWubzmdnip3P"
        }
        let data = await axios
            .get("https://api.textgears.com/spelling", {
                params: params
            })
            .then(function (res) {
                var errors = res.data.response.errors
                var offset_errors = []
                for (let i = 0; i < errors.length; i++) {
                    offset_errors.push(errors[i].offset)
                }
                
                console.log(params.text.split(" "))
                // console.log(offset_errors)
                var text_split = params.text.split(" ")
                const output_text = text_split.slice();
                var len = 0
                for (const [index, element] of text_split.entries()) {
                    len += (element.length)
                    len += 1
                    if (offset_errors.includes(len)) {
                        output_text[text_split.indexOf(text_split[index + 1])] = `<span style="color:red;">${text_split[index + 1]}</span>`
                        // output_text.push(`<span style="color:red;">${text_split[index + 1]}</span>`)
                    }
                    console.log(len)
                }
                // console.log(output_text)
                // console.log(text_split)
                // this.setState({
                //     text: text_split.join(" "),
                //     errors: errors,
                //     isDataFetched: true
                // })
                return output_text.join(" ");
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({
            text: data,
            isDataFetched: true
        })
    }


    // componentDidMount() {

    //     var params = {
    //         text: this.state.status,
    //         language: "en-GB",
    //         key: "CDHGwWubzmdnip3P"
    //     }
    //     console.log("Inside componentDidMount")
    //     axios.get('https://api.textgears.com/spelling', {
    //         params: params
    //     })
    //         .then((res) => {
    //             // console.log(res.data.response.errors)
    //             var errors = res.data.response.errors
    //             var offset_errors = []
    //             for (let i = 0; i < errors.length; i++) {
    //                 offset_errors.push(errors[i].offset)
    //             }
    //             var output_text = []
    //             // console.log(params.text.split(" "))
    //             var text_split = params.text.split(" ")
    //             var len = 0
    //             for (const [index, element] of text_split.entries()) {
    //                 len += (element.length)
    //                 len += 1
    //                 if (offset_errors.includes(len)) {
    //                     text_split[text_split.indexOf(text_split[index + 1])] = `<span style="color:red;">${text_split[index + 1]}</span>`
    //                     output_text.push(`<span style="color:red;">${text_split[index + 1]}</span>`)
    //                 }
    //                 // console.log(len)
    //             }
    //             // console.log(output_text)
    //             // console.log(text_split)
    //             this.setState({
    //                 text: text_split.join(" "),
    //                 errors: errors,
    //                 isDataFetched: true
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    render() {

        console.log("Inside render")
        const { todos, text, isDataFetched } = this.state;

        // if (isDataFetched) {
        return (
            <div className="container">
                <input type="file" className="hidden"
                    multiple={false}
                    accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
                    onChange={evt => this.openFile(evt)} />
                {/* <div>{text}</div> */}
                <div className="output-container">{ReactHtmlParser(text)}</div>
                
            </div>
        )
        // }
        // else {
        //     return (
        //         <div>
        //             Loading.....
        //         </div>
        //     )
        // }
    }
}

