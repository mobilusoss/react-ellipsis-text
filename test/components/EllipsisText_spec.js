'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import chai from 'chai';
let expect = chai.expect;
import EllipsisText from '../../src/components/EllipsisText';


describe('Test of EllipsisText', () => {

  let component;

  describe('test of properties', () =>{
    it('should have default props', function () {
      component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={5} />);
      expect(component.props.text).to.be.eql('1234567890');
      expect(component.props.length).to.be.eql(5);
      expect(component.props.tail).to.be.eql('...');
      expect(component.props.tailClassName).to.be.eql('more');
      expect(component.props.tooltip).to.be.eql(null);
    });
  });

  describe('test of rendered element', () => {
    describe('check ellipsified text', () => {
      it('will not slice text when length < 0', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={-1} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1234567890');
      });
      it('will slice text when length = 0', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={0} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('...');
      });
      it('will slice text when length < tail.length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={2} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('...');
      });
      it('will slice text when length === tail.length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={3} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('...');
      });
      it('will not slice text when length > tail.length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={4} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1...');
      });
      it('will slice text when text.length > length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('123456...');
      });
      it('will not slice text when text.length == length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={10} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1234567890');
      });
      it('will not slice text when text.length < length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={11} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1234567890');
      });
    });

    describe('check trailing text', () => {
      it('will use default trailing string when no tail props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('123456...');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('123456');
        expect(innerSpans[1].textContent).to.be.eql('...');
      });
      it('will use custom trailing string when tail(tail.length=0) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={''}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('123456789');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('123456789');
        expect(innerSpans[1].textContent).to.be.eql('');
      });
      it('will use custom trailing string when tail(tail.length =1) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@'}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('12345678@');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('12345678');
        expect(innerSpans[1].textContent).to.be.eql('@');
      });
      it('will use custom trailing string when tail(1 < tail.length < length) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@'}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('1234567@@');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('1234567');
        expect(innerSpans[1].textContent).to.be.eql('@@');
      });
      it('will use custom trailing string when tail(tail.length = length) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@@@@@@@@'}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('@@@@@@@@@');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('');
        expect(innerSpans[1].textContent).to.be.eql('@@@@@@@@@');
      });
      it('will use custom trailing string when tail(tail.length > length) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@@@@@@@x@'}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(el[0].textContent).to.be.eql('@@@@@@@@x@');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[0].textContent).to.be.eql('');
        expect(innerSpans[1].textContent).to.be.eql('@@@@@@@@x@');
      });
    });

    describe('check trailing text class name', () => {
      it('will use default trailing element class name when no tailClassName props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[1].className).to.be.eql('more');
      });

      it('will use custome trailing element class name when tailClassName props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tailClassName='myClass'/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        let innerSpans = el[0].querySelectorAll('span');
        expect(innerSpans[1].className).to.be.eql('myClass');
      });
    });

    describe('check tooltip', () =>{
      it('will do nothing on mouseenter when tooltip prop is null(default)', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        let innerSpans = el[0].querySelectorAll('span');
        TestUtils.Simulate.mouseEnter(innerSpans[1]);
        let tooltip = TestUtils.scryRenderedDOMComponentsWithClass(component, 'EllipsisTextCopy');
        expect(tooltip.length).to.be.eql(0);
        expect(component.state.tooltipShown).to.be.eql(false);
      });

      describe('will enable tooltip when tooltip prop is supplied', () => {
        let appeard = false;
        let disappeard = false;
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tooltip={{
          clipboard: true,
          onAppear: () => {appeard = true;},
          onDisapepear: () => {disappeard = true;}
        }}/>);
        let tooltip = TestUtils.scryRenderedDOMComponentsWithClass(component, 'EllipsisTextCopy');
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        let innerSpans = el[0].querySelectorAll('span');

        it('will show nothing before mouseenter', function (done) {
          expect(tooltip.length).to.be.eql(1);
          expect(tooltip[0].textContent).to.be.eql('1234567890');
          expect(appeard).to.be.eql(false);
          expect(disappeard).to.be.eql(false);
          done();
        });

        it('will show tooltip on mouseEnter', (done) => {
          // component._handleMouseEnter.call(component, new Event('dummy'));
          TestUtils.Simulate.mouseEnter(innerSpans[1]);
          expect(appeard).to.be.eql(true);
          expect(disappeard).to.be.eql(false);
          done();
        });

        it('will hide tooltip on mouseLeave', function(done){
          this.timeout(2000);
          // component._handleMouseLeave.call(component, new Event('dummy'));
          TestUtils.Simulate.mouseLeave(innerSpans[1]);
          setTimeout(() => {
            expect(appeard).to.be.eql(true);
            expect(disappeard).to.be.eql(true);
            done();
          }, 1100);
        });
      });
    });
  });

});
