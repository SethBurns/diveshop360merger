'use client';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';

import Papa from 'papaparse';

interface ObjectWithPrice {
  'Part #': string;
  'Primary Description': string;
  'Auxiliary Description': string;
  'Vendor Part Number': string;
  Barcode: string;
  'Vendor Name': string;
  Category: string;
  Manufacturer: string;
  Size: string;
  'Color I': string;
  'Color II': string;
  'Accent Color': string;
  'Model Number': string;
  Cost: string;
  MSRP: string;
  Retail: string;
  'Gross Margin %': string;
  'Minimum Price': string;
  'Sale Price': string;
  'Package Price': string;
  'Preferred Customer Price': string;
  Staff: string;
  Government: string;
  Wholesale: string;
  'Online Price': string;
  'Apply Tax 1 (Yes/No)': string;
  'Apply Tax 2 (Yes/No)': string;
  'Apply Tax 3 (Yes/No)': string;
  'No Commission flag': string;
  'Commission Bonus': string;
  'On Sale': string;
  'Ignore Roundup': string;
  'Discount Value (%)': string;
  'Quantity on Hand': string;
  'Make Miscelleneous Item': string;
  "Don't check for inventory in Stock Flag": string;
  'Reorder Level': string;
  'Preferred Stock Level': string;
  'Reorder Quantity': string;
  'Unit of Measurement': string;
  'Case Quantity': string;
  'Stocking Location': string;
  'Print Label for each item in Stock': string;
  'Warranty Reminder': string;
  'Popup Notes': string;
  'POS Visibility': string;
  'Last Received Date': string;
  'Website Visibility': string;
  'Online Title': string;
  'Online Description': string;
  'Free Shipping': string;
  'Display in Product Listing': string;
  'Min. Advertised Pricing Flag': string;
  'Min. Advertised Pricing': string;
  'Image 1': string;
  'Image 2': string;
  'Image 3': string;
  'Image 4': string;
  'Image 5': string;
  'Product Url': string;
}

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  const [finalCsv, setFinalCsv] = useState<string>('');

  const [error, setError] = useState<string>('');

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    Papa.parse(event.target.files?.[0]!, {
      header: true,
      error: function (err) {
        console.log(err);
      },
      complete: function (results) {
        setData(results.data);
        console.log(results ?? 'no results');
      },
    });
  };

  const handleFileTwo = (event: ChangeEvent<HTMLInputElement>) => {
    Papa.parse(event.target.files?.[0]!, {
      header: true,
      complete: function (results2) {
        setData2(results2.data);
      },
    });
  };

  const combineDuplicates = (mergedArray: ObjectWithPrice[]) => {
    const result: ObjectWithPrice[] = [];
    const map: { [key: string]: ObjectWithPrice } = {};

    mergedArray.forEach((item) => {
      const key = item.Barcode;

      if (map[key]) {
        map[key][`Quantity on Hand`] = (
          parseInt(map[key][`Quantity on Hand`], 10) +
          parseInt(item[`Quantity on Hand`], 10)
        ).toString();
      } else {
        map[key] = { ...item };
      }
    });

    for (const key in map) {
      result.push(map[key]);
    }
    console.log(result);
    setFinalCsv(Papa.unparse(result, { delimiter: '\n' }));
  };

  return (
    <main className="">
      <div className="">
        <h1>DS360 to Amazon</h1>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={(e) => handleFile(e)}
          className="m-2"
        ></input>
        <input
          type="file"
          name="file"
          accept=".csv"
          onChange={(e) => handleFileTwo(e)}
          className="m-2"
        ></input>
        <button onClick={() => combineDuplicates([...data, ...data2])}>
          Combine
        </button>
        <br />
        <div>{finalCsv}</div>
      </div>
    </main>
  );
}
