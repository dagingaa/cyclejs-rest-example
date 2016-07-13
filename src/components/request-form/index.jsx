import './styles.css';

import xs from 'xstream';
import { html } from 'snabbdom-jsx';

const DEFAULT_URL = "http://jsonplaceholder.typicode.com/users/1";
const FORMATS = ["json", "xml"];
const METHODS = ["GET", "POST", "PUT", "DELETE", "HEAD", "TRACE", "OPTIONS", "PATCH"];

function model({ onChangeMethod$, onChangeFormat$, onUpdateUrl$ }) {
    const method$ = onChangeMethod$
        .startWith(METHODS[0]);
    const format$ = onChangeFormat$
        .startWith(FORMATS[0]);
    const url$ = onUpdateUrl$
        .startWith(DEFAULT_URL);

    return xs.combine(method$, url$, format$)
        .map(([method, url, format]) => ({ method, url, format }));
}

function view(state$) {
    return state$
        .map(render);
}

function intents(domSource) {
    const onChangeMethod$ = domSource.select('select[name=method]')
        .events('change')
        .map(evt => evt.target.value);
    const onChangeFormat$ = domSource.select('select[name=format]')
        .events('change')
        .map(evt => evt.target.value);
    const onUpdateUrl$ = domSource.select('input[name=url]')
        .events('blur')
        .map(evt => evt.target.value);

    return { onChangeMethod$, onChangeFormat$, onUpdateUrl$ };
}

function render({ selectedMethod, url, selectedFormat}) {
    return (
        <form className="request-form" name="requestConfig">
            <div className="select-wrapper">
                <label for="method">Method</label>
                <select name="method" value={ selectedMethod }>
                    { METHODS.map(method => (
                    <option value={ method }>{ method }</option>
                    ))}
                </select>
            </div>
            <div className="input-wrapper">
                <label for="url">Request URL</label>
                <input type="url" name="url" value={ url }/>
            </div>
            <div className="select-wrapper">
                <label for="format">Format</label>
                <select name="format" value={ selectedFormat }>
                    { FORMATS.map(format => (
                    <option value={ format }>{ format }</option>
                    ))}
                </select>
            </div>
        </form>
    );
}

function RequestForm(sources) {
    const actions = intents(sources.DOM);
    const state$ = model(actions);

    return {
        DOM: view(model(intents(sources.DOM))),
        state: state$,
    };
}

export default RequestForm;
