import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { formatMeasurement } from './formatMeasurements';
import { formatArticle } from './formatArticle';
import { equal } from './utility';

export class MobileView implements IObserver, IView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            const pastMeasurments = this.measurements;
            this.measurements = observable.getMeasurements().slice(-1);

            if (!equal(pastMeasurments, this.measurements)) {
                this.render();
            }
        } else if (observable instanceof NewsState) {
            const pastArticles = this.articles;
            this.articles = observable.getArticles().slice(-1);

            if (!equal(pastArticles, this.articles)) {
                this.render();
            }
        }
    }

    public render() {
        const newContent = [
            ...this.articles.map(formatArticle),
            ...this.measurements.map(formatMeasurement)
        ];

        console.log(`<div class="mobile">\n${newContent.join('\n')}\n</div>`);
    }
}
