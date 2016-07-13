import xs from 'xstream';
import { html } from 'snabbdom-jsx';

const category = "request";

function model(response$) {
    return response$
        .startWith(null);
}

function view(state$) {
    return state$
        .map(render);
}

function intent(httpSource) {
    return httpSource.select(category)
        .flatten()
        .map(res => res.body)
}

function render(response) {
    return (
        <pre><code>{ response ? JSON.stringify(response, null, 4) : "" }</code></pre>
    );
}

function request(config$) {
    return config$
        .map(({ url, method, format }) => ({
            url,
            method,
            category,
            type: `application/${ format }`,
        }));
}

function ResponseViewer(sources) {
    return {
        DOM: view(model(intent(sources.HTTP))),
        HTTP: request(sources.props),
    };
}

export default ResponseViewer;
