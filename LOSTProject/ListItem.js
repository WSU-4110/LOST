import React, { Component } from "react";

const CardSubtitle = styled.Text`
font-size: 11px;
font-weight: bold;
color: #62626c;
`;

export default class ListItem extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card>
                <CardImage source={{ uri: this.props.item.imageUri }} />
                <CardContent>
                    <CardTitle>this.props.item.title</CardTitle>
                    <CardSubtitle>
                        {this.props.item.album + " - " + this.props.item.artist}
                    </CardSubtitle>
                </CardContent>
            </Card>
        );
    }
}