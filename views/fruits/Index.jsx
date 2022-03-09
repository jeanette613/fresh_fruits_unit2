const React = require('react');
const DefaultLayout = require('../Default.jsx');

class Index extends React.Component {
    render() {
        const { fruits } = this.props;
        return (
            // In the render of your class
            <DefaultLayout>
                <div>
                    {
                        fruits.map((fruit) => (
                            <article>
                                <a href={`/fruits/${fruit._id}`}>
                                    <h2>
                                        {fruit.name} - {fruit.readyToEat ? 'Ripe' : 'Not Ripe Yuck ich hässlich'}
                                    </h2>
                                </a>
                            </article>
                        ))
                    }
                </div>
            </DefaultLayout>
        )
    }
}

module.exports = Index;