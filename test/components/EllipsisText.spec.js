import React from 'react';
import { render, cleanup } from '@testing-library/react'
import EllipsisText from '../../src/components/EllipsisText';


describe('Test of EllipsisText', () => {
  beforeEach(cleanup);

  describe('test of properties', () => {
    test('should have render ellipsis by default', () => {
      const { getByText } = render(<EllipsisText text='12345' length={5} />);
      expect(getByText(/^12345$/)).toBeTruthy();
    });
  });

  describe('test of rendered element', () => {
    describe('check ellipsified text', () => {
      test('will not slice text when length < 0', () => {
        const { getByText } = render(<EllipsisText text='1234567890' length={-1} />);
        expect(getByText(/^1234567890$/)).toBeTruthy();
      });
      test('will slice text when length = 0', () => {
        const { getByText } = render(<EllipsisText text='1234567890' length={0} />);
        expect(getByText(/^...$/)).toBeTruthy();
      });
      test('will slice text when length < tail.length', () => {
        const { getByText } = render(<EllipsisText text='1234567890' length={2} />);
        expect(getByText(/^...$/)).toBeTruthy();
      });
      test('will slice text when length === tail.length', () => {
        const { getByText } = render(<EllipsisText text='1234567890' length={3} />);
        expect(getByText(/^...$/)).toBeTruthy();
      });
      test('will not slice text when length > tail.length', () => {
        const { getByText } = render(<EllipsisText text='1234567890' length={4} />);
        expect(getByText(/^1$/).textContent).toEqual('1...');
      });
      test('will slice text when text.length > length', () => {
        const { getByText } = render(<EllipsisText text='1234567890' length={9} />);
        expect(getByText(/^123456$/).textContent).toEqual('123456...');
      });
      test('will not slice text when text.length == length', () => {
        const { getByText } = render(<EllipsisText text='1234567890' length={10} />);
        expect(getByText(/^1234567890$/).textContent).toEqual('1234567890');
      });
      test('will not slice text when text.length < length', () => {
        const { getByText } = render(<EllipsisText text='1234567890' length={11} />);
        expect(getByText(/^1234567890$/).textContent).toEqual('1234567890');
      });
    });
  });

  describe('check trailing text', () => {
    test('will use default trailing string when no tail props suplied', () => {
      const { getByText } = render(<EllipsisText text='1234567890' length={9} />);
      expect(getByText(/^123456$/).textContent).toEqual('123456...');
    });
    test('will use custom trailing string when tail(tail.length=0) props suplied', () => {
      const { getByText } = render(<EllipsisText text='1234567890' length={9} tail={''}/>);
      expect(getByText(/^123456789$/).textContent).toEqual('123456789');
    });
    test('will use custom trailing string when tail(tail.length =1) props suplied', () => {
      const { getByText } = render(<EllipsisText text='1234567890' length={9} tail={'@'}/>);
      expect(getByText(/^12345678$/).textContent).toEqual('12345678@');
    });
    test('will use custom trailing string when tail(1 < tail.length < length) props suplied', () => {
      const { getByText } = render(<EllipsisText text='1234567890' length={9} tail={'@@'}/>);
      expect(getByText(/^1234567$/).textContent).toEqual('1234567@@');
    });
    it('will use custom trailing string when tail(tail.length = length) props suplied', () => {
      const { getByText } = render(<EllipsisText text='1234567890' length={9} tail={'@@@@@@@@@'}/>);
      expect(getByText(/^@@@@@@@@@$/)).toBeTruthy();
    });
    it('will use custom trailing string when tail(tail.length > length) props suplied', () => {
      const { getByText } = render(<EllipsisText text='1234567890' length={9} tail={'@@@@@@@@x@'}/>);
      expect(getByText(/^@@@@@@@@x@$/)).toBeTruthy();
    });
  });

  describe('check trailing text class name', () => {
    test('will use default trailing element class name when no tailClassName props suplied', () => {
      const { getByText } = render(<EllipsisText text='1234567890' length={9} />);
      expect(getByText(/^...$/).className).toEqual('more');
    });

    test('will use custome trailing element class name when tailClassName props suplied', () => {
      const { getByText } = render(<EllipsisText text='1234567890' length={9} tailClassName='myClass'/>);
      expect(getByText(/^...$/).className).toEqual('myClass');
    });
  });
});
