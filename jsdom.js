import { JSDOM } from "jsdom";
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="userFeedback" class="pb-3"></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;
