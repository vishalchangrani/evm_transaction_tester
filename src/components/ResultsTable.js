import React from "react";

function ResultsTable({ results }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Chain</th>
          <th>Soft Finality</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.chain}</td>
            <td>{result.softFinality}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable;
