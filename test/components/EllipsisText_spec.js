'use strict';
import React from 'react/addons';
import chai from 'chai';
let expect = chai.expect;
import EllipsisText from '../../lib/components/EllipsisText';
const {TestUtils} = React.addons;

describe('Test of EllipsisText', () => {

  let component;

  describe('test of properties', () =>{
    it('should have default props', function () {
      component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={5} />);
      expect(component.props.text).to.be.eql('1234567890');
      expect(component.props.length).to.be.eql(5);
      expect(component.props.tail).to.be.eql('...');
      expect(component.props.tailClassName).to.be.eql('more');
      expect(component.props.tooltip).to.be.eql(false);
      expect(component.props.clipboard).to.be.eql(false);
    });
  });

  describe('test of rendered element', () => {
    describe('check ellipsified text', () => {
      it('will not slice text when length = 0', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={0} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('1234567890');
      });
      it('will not slice text when length < 0', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={-1} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('1234567890');
      });
      it('will not slice text when text.length < length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={11} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('1234567890');
      });
      it('will not slice text when text.length == length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={10} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('1234567890');
      });
      it('will slice text when text.length > length', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('123456...');
      });
    });

    describe('check trailing text', () => {
      it('will use default trailing string when no tail props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('123456...');
        expect(React.findDOMNode(el[1]).textContent).to.be.eql('123456');
        expect(React.findDOMNode(el[2]).textContent).to.be.eql('...');
      });
      it('will use custom trailing string when tail(tail.length=0) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={''}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('123456789');
        expect(React.findDOMNode(el[1]).textContent).to.be.eql('123456789');
        expect(React.findDOMNode(el[2]).textContent).to.be.eql('');
      });
      it('will use custom trailing string when tail(tail.length =1) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@'}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('12345678@');
        expect(React.findDOMNode(el[1]).textContent).to.be.eql('12345678');
        expect(React.findDOMNode(el[2]).textContent).to.be.eql('@');
      });
      it('will use custom trailing string when tail(1 < tail.length < length) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@'}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('1234567@@');
        expect(React.findDOMNode(el[1]).textContent).to.be.eql('1234567');
        expect(React.findDOMNode(el[2]).textContent).to.be.eql('@@');
      });
      it('will use custom trailing string when tail(tail.length = length) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@@@@@@@@'}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('@@@@@@@@@');
        expect(React.findDOMNode(el[1]).textContent).to.be.eql('');
        expect(React.findDOMNode(el[2]).textContent).to.be.eql('@@@@@@@@@');
      });
      it('will use custom trailing string when tail(tail.length > length) props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tail={'@@@@@@@@@@'}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[0]).textContent).to.be.eql('@@@@@@@@@@');
        expect(React.findDOMNode(el[1]).textContent).to.be.eql('');
        expect(React.findDOMNode(el[2]).textContent).to.be.eql('@@@@@@@@@@');
      });


    });
    describe('check trailing text class name', () => {
      it('will use default trailing element class name when no tailClassName props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} />);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[2]).className).to.be.eql('more');
      });

      it('will use custome trailing element class name when tailClassName props suplied', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tailClassName='myClass'/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(React.findDOMNode(el[2]).className).to.be.eql('myClass');
      });
    });

    describe('check tooltip', () =>{
      it('will do nothing on mouseenter when tooltip prop is false(default)', function () {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9}/>);
        const el = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        TestUtils.Simulate.mouseEnter(React.findDOMNode(el[2]));
        let tooltip = TestUtils.scryRenderedDOMComponentsWithClass(component, 'EllipsisTextTooltip');
        expect(tooltip.length).to.be.eql(0);
        expect(component.state.tooltipShown).to.be.eql(false);
      });

      describe('will enable tooltip when tooltip prop is true', () => {
        component = TestUtils.renderIntoDocument(<EllipsisText text='1234567890' length={9} tooltip={true}/>);
        let tooltip = TestUtils.scryRenderedDOMComponentsWithClass(component, 'EllipsisTextTooltip');
        it('will show nothing before mouseenter', function () {

          expect(tooltip.length).to.be.eql(1);
          expect(React.findDOMNode(tooltip[0]).textContent).to.be.eql('1234567890');
          expect(component.state.tooltipShown).to.be.eql(false);
        });

        it('will show tooltip on mouseEnter', () => {
          // TestUtils.Simulate.mouseEnter(React.findDOMNode(el[2]));
          component._handleMouseEnter.call(component, new Event('dummy'));
          expect(component.state.tooltipShown).to.be.eql(true);
        });

        it('will hide tooltip on mouseLeave', function(done){
          this.timeout(2000);
          // TestUtils.Simulate.mouseLeave(React.findDOMNode(el[2]));
          component._handleMouseLeave.call(component, new Event('dummy'));
          setTimeout(() => {
            expect(component.state.tooltipShown).to.be.eql(false);
            done();
          }, 1100);
        });
      });
    });
  });

});
