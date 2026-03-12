import React from 'react';
import {
    render
} from '@testing-library/react';
import App from './App';


test('renders server status heading', () => {
    // 1. Render your new monitoring app
    const { getByText } = render(<App />);
    
    // 2. Search for your new "Status" text
    // We use a "regex" (the //i) to find the text even while it's "FETCHING"
    const statusElement = getByText(/Server Status/i);
    
    // 3. The "Judge" confirms it's there
    expect(statusElement).toBeInTheDocument();
});
