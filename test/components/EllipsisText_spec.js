'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import chai from 'chai';
let expect = chai.expect;
import EllipsisText from '../../src/components/EllipsisText';


describe('Test of EllipsisText', () => {

  let component;

  describe('test of properties', () =>{
    it('should have default props', function () {
      component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={5} />);
      expect(component.props.text).to.be.eql('1234567890');
      expect(component.props.length).to.be.eql(5);
      expect(component.props.tail).to.be.eql('...');
      expect(component.props.tailClassName).to.be.eql('more');
    });
  });

  describe('test of rendered element', () => {
    describe('check ellipsified text', () => {
      it('will not slice text when length < 0', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={-1} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1234567890');
      });
      it('will slice text when length = 0', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={0} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('...');
      });
      it('will slice text when length < tail.length', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={2} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('...');
      });
      it('will slice text when length === tail.length', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={3} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('...');
      });
      it('will not slice text when length > tail.length', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={4} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1...');
      });
      it('will slice text when text.length > length', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('123456...');
      });
      it('will not slice text when text.length == length', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={10} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1234567890');
      });
      it('will not slice text when text.length < length', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={11} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1234567890');
      });
    });

    describe('check trailing text', () => {
      it('will use default trailing string when no tail props suplied', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('123456...');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('...');
      });
      it('will use custom trailing string when tail(tail.length=0) props suplied', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={''}/>);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('123456789');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('');
      });
      it('will use custom trailing string when tail(tail.length =1) props suplied', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@'}/>);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('12345678@');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('@');
      });
      it('will use custom trailing string when tail(1 < tail.length < length) props suplied', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@'}/>);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1234567@@');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('@@');
      });
      it('will use custom trailing string when tail(tail.length = length) props suplied', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@@@@@@@@'}/>);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('@@@@@@@@@');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('@@@@@@@@@');
      });
      it('will use custom trailing string when tail(tail.length > length) props suplied', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@@@@@@@x@'}/>);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('@@@@@@@@x@');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('@@@@@@@@x@');
      });
    });

    describe('check trailing text class name', () => {
      it('will use default trailing element class name when no tailClassName props suplied', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].className).to.be.eql('more');
      });

      it('will use custome trailing element class name when tailClassName props suplied', function () {
        component = ReactTestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tailClassName='myClass'/>);
        const el = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].className).to.be.eql('myClass');
      });
    });
  });
});
