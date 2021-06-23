import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, usePDF } from '@react-pdf/renderer';
import './App.css'
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  title: {
    fontSize: '25px',
    fontWeight: 'bold'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});


function PdfUtilComponent(props) {

  const d = props.doc;

  const [instance, updateInstance] = usePDF({ document: props.doc });
  console.log(instance);
  const [bStream, setBStream] = useState('')

  const printBinary = () => {
    const reader = new FileReader();
    reader.readAsDataURL(instance.blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      setBStream(base64data)
    }
  }

  return (
    <>
      {
        d ?
          <>
            <div>
              < a href={instance.url} download="test.pdf" >
                Download
</a >
              <Button onClick={printBinary}>Print Binary</Button>
              <p style={{ wordWrap: 'break-word' }}>{bStream}</p>
            </div >
          </>
          : null
      }
    </>
  )

}

function App() {
  const [document, setDocument] = useState()

  const handleSubmit = (values) => {
    const myDoc = (
      <Document>
        <Page title={values.title} size="A4" style={styles.page}>
          <Text style={styles.title}>{values.title}</Text>
          <View style={styles.section}>
            <Text>{values.section1}</Text>
          </View>
          <View style={styles.section}>
            <Text>{values.section2}</Text>
          </View>
          <View style={styles.section}>
            <Text>{values.section3}</Text>
          </View>
        </Page>
      </Document>
    );
    setDocument(myDoc)
  }
  return (
    <div className="page-container">

      <div className="left-container">
        {
          !document ? (
            <Form onFinish={handleSubmit}>
              <Form.Item
                name="title"
                label="Title"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="section1"
                label="Section 1"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="section2"
                label="Section 2"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="section3"
                label="Section 3"
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
          </Button>
              </Form.Item>
            </Form>
          ) : (
              <PDFViewer
                width='100%'
                height='100%'
              >
                {document}
              </PDFViewer>
            )
        }

      </div>
      {
        document ? <div className='util-container'>
          <PdfUtilComponent doc={document} />
        </div> : null
      }
    </div>
  );
}

export default App;
