import React, {Component} from 'react';


// Based on examples from the following sites: 
// https://reactjs.org/docs/thinking-in-react.html
// https://javascriptplayground.com/blog/2017/01/http-requests-reactjs/

const ApiUrl = 'https://dog.ceo/api/breeds/list/all';

class Row extends React.Component {
    render() {
        return (
            <tr>
                <td class="capitalize">{this.props.breed}</td>
                <td class="capitalize">{this.props.subbreed}</td>
            </tr>
        )
    }
}

class Table extends React.Component {


    render() {

        const searchText = this.props.searchText;
        //const tableList = JSON.parse(this.props.apiData);

        const rows = [];

        Object.keys(this.props.apiResults).forEach((key) => {

            const breed = key;
            var subbreed  = ''; 

            //console.log(key, this.props.apiResults[key]);
            if (this.props.apiResults[key].length === 0) {

                if (breed.indexOf(searchText.toLowerCase()) !== -1) {
                    rows.push(
                        <Row 
                            breed={breed} 
                            subbreed={subbreed}
                        />
                    );
                }
            }
            else if (this.props.apiResults[key].length > 0) {

                for(var x = 0; x < this.props.apiResults[key].length; x++) {
                    if (key.indexOf(searchText.toLowerCase()) !== -1 || this.props.apiResults[key][x].indexOf(searchText.toLowerCase()) !== -1) {
                        subbreed = this.props.apiResults[key][x];
                        rows.push(
                            <Row 
                                breed={breed}
                                subbreed={subbreed}
                            />
                        );
                    }
                }
            }

        });

        //var length = this.props.apiResults.size;

        // this.props.apiResults.foreach((record) => {
        //     rows.push('<p>' + record + '</p>');
        // })

        //rows.sort();

        return (
            <table>
                <thead>
                    <tr>
                        <th>Breed</th>
                        <th>Sub-Breed</th>
                    </tr>
                </thead>

                <tbody>
                   {rows}
                </tbody>
            </table>
        )
    }
}

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    handleSearchTextChange(e) {
        this.props.onSearchTextChange(e.target.value);
    }

    render() {
        return (
            <form>
                <label>
                    Breed Filter:
                </label>
                <input 
                    type="text"
                    placeholder="Search"
                    value={this.props.searchText}
                    onChange={this.handleSearchTextChange}
                />
                <p/>
            </form>
        )
    }
}

class SearchTable extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            searchText: '',
            apiCallFailed : false
        }

        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);

    }

    componentDidMount() {

        fetch(ApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw Error("API Call Failed")
                }

                return response;
            })
            .then(replyData => replyData.json())
            .then(replyData => {
                this.setState({
                    apiData: replyData
                })
            }, () => {
                this.setState({
                    apiCallFailed: true
                })
            })
    }

    handleSearchTextChange(searchText) {
        this.setState({
            searchText: searchText
        });
    }

    render() {

        if (this.state.apiCallFailed) return (<p>Failed to Retrieve Data</p>)
        
        if (!this.state.apiData) return (<p>Retrieving Data</p> )

        return (

            <div>
                <Search 
                    searchText={this.state.searchText} 
                    onSearchTextChange={this.handleSearchTextChange}
                />
                <Table
                    searchText={this.state.searchText}
                    apiResults={this.state.apiData.message}
                />
            </div>
            
        )
    }

}

export default SearchTable;