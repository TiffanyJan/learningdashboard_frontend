import React from 'react'
import './AddResourceView.css'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Button, Form } from 'reactstrap';
import ResourceService from '../service/ResourceService';



export default class EditResourceView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.resource.title,
            url: this.props.resource.url,
            description: this.props.resource.description,
            userName: this.props.resource.userName,
            resourceTags: [],
            tagStatus: this.createTagStatusObject(),
            resourceId: this.props.resource.resourceId

        }

        this.handleTagClick = this.handleTagClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    //handles changes to text inputs storing values in state
    handleChange = (e) => {
        if (e.target.id === "title") {
            this.setState({ title: `${e.target.value}` })
        } else if (e.target.id === "url") {
            this.setState({ url: `${e.target.value}` })
        } else if (e.target.id === "description") {
            this.setState({ description: `${e.target.value}` })
        } else if (e.target.id === "userName") {
            this.setState({ userName: `${e.target.value}` })
        }
    };

    //handles clicking the tag buttons and stores in state
    handleTagClick(event) {
        event.preventDefault()
        this.toggleTagStatus(event.target.id)
    }


    //handle submitting form
    async handleSubmit(e) {
        e.preventDefault()
        const updatedResource = {
            title: this.state.title,
            url: this.state.url,
            description: this.state.description,
            userName: this.state.userName,
            resourceTags: this.getSelectedTags()
        }

        const resourceId = this.state.resourceId;

        if (updatedResource.title && updatedResource.url && updatedResource.description && updatedResource.userName) {

            if (updatedResource.resourceTags.length >= 1) {
                await ResourceService.editResource(resourceId, updatedResource);

                this.props.changeViewHandler("home");
            } else {
                alert ("Please select at least one topic tag for your resource")
            }
          
        } else {
            alert("Please complete all fields");

        }

    }


    createTagStatusObject() {
        console.log(this.props.taglist)
        console.log(this.props.resource.resourceTags)
        let tagStatus = {}
        for (let i = 0; i < this.props.taglist.length; i++) {
            tagStatus[this.props.taglist[i]] = false
            for(let j = 0; j< this.props.resource.resourceTags.length; j++){
                console.log(this.props.taglist[i])
                console.log(this.props.resource.resourceTags[j])
                if(this.props.taglist[i]==this.props.resource.resourceTags[j]){
                    tagStatus[this.props.taglist[i]] = true;
                }
            }
        }
        console.log(tagStatus)
        return tagStatus
    }

    resetTagStatus() {
        let newTagStatus = this.state.tagStatus
        for (let i in newTagStatus) {
            newTagStatus[i] = false
        }
        this.setState({ tagStatus: newTagStatus })
    }

    toggleTagStatus(tag) {
        let newTagStatus = this.state.tagStatus
        newTagStatus[tag] = !newTagStatus[tag]
        this.setState({ tagStatus: newTagStatus })
    }

    getSelectedTags() {
        const selectedTags = []
        for (let tag in this.state.tagStatus) {
            if (this.state.tagStatus[tag] == true) {
                selectedTags.push(tag)
            }
        }
        return selectedTags
    }

    generateCheckBoxes() {
        const taglist = this.props.taglist
        const arrayOfTags = taglist.map((tag) => {
            let selectStatusClass = ""
            if (this.state.tagStatus[tag] == true) {
                selectStatusClass = "selected"
            }
            return (
                <div key={tag} className="col-6 col-md-4 tag-text-size">
                    <button type="button"
                        id={tag}
                        className={"badge badge-secondary " + selectStatusClass}
                        onClick={this.handleTagClick}>{tag}</button>
                </div>
            )
        }
        )
        return arrayOfTags
    }


    render() {

        return (
            <div className="container-fluid">

                <div className="row justify-content-center">
                    <div className="col-10">
                        <h6 className="mt-5 mb-0">Add a new resource:</h6>
                    </div>
                </div>

                <Form onSubmit={this.onSubmit}>
                    <div className="row mt-3 justify-content-center">
                        <div className="col-10">
                            <InputGroup>
                                <InputGroupAddon className="inputAddon" addonType="prepend" >Title</InputGroupAddon>
                                <Input id="title" value={this.state.title} onChange={e => this.handleChange(e)} placeholder="150 characters max" />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="row mt-3 justify-content-center">
                        <div className="col-10">
                            <InputGroup>
                                <InputGroupAddon className="inputAddon" addonType="prepend">URL</InputGroupAddon>
                                <Input id="url" value={this.state.url} onChange={e => this.handleChange(e)} placeholder="150 characters max" />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="row mt-3 justify-content-center">
                        <div className="col-10">
                            <InputGroup>
                                <InputGroupAddon className="inputAddon" addonType="prepend">Description</InputGroupAddon>
                                <Input id="description" type='textarea' value={this.state.description} onChange={e => this.handleChange(e)} />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="row mt-3 justify-content-center">
                        <div className="col-10">
                            <InputGroup>
                                <InputGroupAddon className="inputAddon" addonType="prepend">Submitted By</InputGroupAddon>
                                <Input id="userName" value={this.state.userName} onChange={e => this.handleChange(e)} placeholder="150 characters max" />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="row mt-4 justify-content-center">
                        <div className="col-10">
                            <h6>Please tag your resource by topic:</h6>
                            <div className="row">
                                {this.generateCheckBoxes()}
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5 mb-4 justify-content-center">
                        <div className="col-10">
                            <Button className="submit-button" onClick={this.handleSubmit} type="button">Save</Button>
                        </div>
                    </div>

                </Form>


            </div>

        )
    }
}
