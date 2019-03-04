import React from 'react'
import {
    Collapse, CardBody, Card, CardHeader, CardLink, Input
} from 'reactstrap';

class CourseMaterial extends React.Component {
    constructor(props) {
        super(props);
        this.openBox = this.openBox.bind(this)

        this.state = {
            isOpen: false
        }
    }

    openBox() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <Card className="mb-2" key={this.props.index}>
                <CardHeader className="custom-card-header" >
                    <div className="container-fluid" onClick={this.openBox}>
                        <div className="row align-items-center">
                            <div className="col-11">
                                <h6>Week {this.props.material.weekNumber}: {this.props.material.topic}</h6>
                            </div>
                            <div className="col-1">
                                <i className="fas fa-angle-down fa-lg float-right"></i>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <Collapse isOpen={this.state.isOpen}>
                    <CardBody>
                        <div className="mb-1 text-muted"><em>Resources</em></div>
                        <div>
                            Lectures:
                            {this.props.material.lectureWebinar.map(url =>
                                <div key={this.props.material.weekNumber + url}>
                                    <CardLink href={url} className="d-block">{url}</CardLink>
                                    <br></br>
                                </div>
                            )}
                            <div>
                                Slides: <CardLink href={this.props.material.slides} className="d-block">{this.props.material.slides}</CardLink>
                                <br></br>
                            </div>
                            <div>
                                Homework Task: <CardLink className="d-block">{this.props.material.homeworkTaskList}</CardLink>
                            </div>
                            <div>
                                <br></br>
                                    {this.props.material.homeworkWebinar.length != 0 ? <div>Homework Webinar: <CardLink href={this.props.material.homeworkWebinar} className="d-block">{this.props.material.homeworkWebinar}</CardLink> </div> : null }
                            </div>
                        </div>
                    </CardBody>
                </Collapse>

            </Card>
        )
    }
}
export default CourseMaterial;