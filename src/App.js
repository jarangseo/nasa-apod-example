import React, {Component} from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavigator';
import Viewer from './components/Viewer';
import Info from './components/Info';
import moment from 'moment';
import * as api from './lib/api';

class App extends Component {
    state = {
        loading: false,
        maxDate: null,
        date: null,
        url: null,
        mediaType: null,
        title: null,
        copyright: null,
        explanation: null,
    }
    // getAPOD = (date) => {
    //     api.getAPOD(date).then((response) => {
    //         console.log(response);
    //     });
    // }

    getAPOD = async (date) => {
        if (this.state.loading) return;

        this.setState({
            loading: true
        });

        try {
            const response = await api.getAPOD(date);
            console.log(response);

            const { date: retrievedDate, url, media_type: mediaType, title, copyright, explanation} = response.data;

            if(!this.state.maxDate) {
                this.setState({
                    maxDate: retrievedDate
                })
            }

            this.setState({
                date: retrievedDate,
                mediaType,
                url,
                title,
                copyright,
                explanation
            });

        } catch (e) {
            console.log(e);
        }

        this.setState({
            loading: false
        });
    }

    handlePrev = () => {
        const { date } = this.state;
        const prevDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
        this.getAPOD(prevDate);
    }

    handleNext = () => {
        const {date, maxDate} = this.state;
        if(date === maxDate) return;

        const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
        this.getAPOD(nextDate);
    }

    componentDidMount() {
        this.getAPOD();
    }

    render() {
        const { url, mediaType, loading, title, copyright, explanation } = this.state;
        const { handlePrev, handleNext } = this;
console.log(title);
        return (
            <ViewerTemplate
                spaceNavigator={<SpaceNavigator onPrev={handlePrev} onNext={handleNext}/>}
                viewer={<Viewer
                    url={url}
                    mediaType={mediaType}
                    loading={loading}
                />}
                info={<Info
                    title={title}
                    copyright={copyright}
                    explanation={explanation}
                />}
            />
        );
    }
}

export default App;
