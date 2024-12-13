import Link from 'next/link';

export default function CssExamination() {
  return (
    <>
      <header id="head" className="secondary">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <h1>CSS Examination</h1>
            </div>
          </div>
        </div>
      </header>

      <div
        className="container-fluid"
        style={{ marginTop: '10px', marginLeft: '90px', marginRight: '450px' }}
      >
        <h1>CSS Examination</h1>
        <p>The test contains 10 questions. It's a nice way to see how much you know, or don't know, about CSS.</p>
        <p>At the end of the exam you will get a certificate.</p>
        <p>Good Luck!!</p>
        <Link href="/que11">
          <a className="btn">Start &gt;&gt;</a>
        </Link>
      </div>

      <style jsx>{`
        .secondary {
          background-color: #f8f9fa;
          padding: 20px 0;
        }
        .btn {
          display: inline-block;
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 4px;
        }
        .btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
}
