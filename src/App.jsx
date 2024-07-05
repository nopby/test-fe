import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';
import './App.css'


const App = () => {
    const [formData, setFormData] = useState({
        negara: '',
        pelabuhan: '',
        barang: '',
        deskripsi: '',
        harga: '',
        tarifBeaMasuk: '',
        totalBeaMasuk: ''
    });

    const [negaraOption, setNegaraOption] = useState([])
    const handleNegaraChange = (event, value) => {
      setFormData({
        ...formData,
        negara: value
      })
    }
    const onInputNegaraChange = async (event, value) => {
      
      try {
        const response = await axios.get(`https://api-hub.ilcs.co.id/my/n/negara?ur_negara=${value}`)
        const data = response.data.data.map(x => ({id: x.kd_negara, text: x.ur_negara}))
        setNegaraOption(data)
      } catch (error) {
        setNegaraOption([]);
      }
    }

    const [pelabuhanOption, setPelabuhanOption] = useState([])
    const handlePelabuhanChange = (event, value) => {
      setFormData({
        ...formData,
        pelabuhan: value
      })
    }
    const onInputPelabuhanChange = async (event, value) => {
      setPelabuhanOption([])
      if (!formData.negara) {
        return;
      }
      try {
        const response = await axios.get(`https://api-hub.ilcs.co.id/my/n/pelabuhan?kd_negara=${formData.negara.id}&ur_pelabuhan=${value}`);
        const data = response.data.data.map(x => ({id: x.kd_pelabuhan, text: x.ur_pelabuhan}))
        setPelabuhanOption(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    const [uraian, setUraian] = useState('');
    const handleBarangChange = async (event) => {
      setFormData({
        ...formData,
        barang: event.target.value
      })
      try {
        const response = await axios.get(`https://api-hub.ilcs.co.id/my/n/barang?hs_code=${event.target.value}`)
        setUraian(response.data.data.uraian_id)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    useEffect(() => {
      
    }, [uraian]);
    return (
        <form>
          <table>
            <tbody>
              <tr>
                <td>Negara</td>
                <td>
                <Autocomplete
                    value={formData.negara}
                    options={negaraOption}
                    getOptionLabel={(option) => option ?  option.text : ''}
                    onChange={handleNegaraChange}
                    onInputChange={onInputNegaraChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Choose an option" variant="outlined" />
                    )}
                  />
                </td>
              </tr>
              <tr>
                <td>Pelabuhan</td>
                <td>
                <Autocomplete 
                    value={formData.pelabuhan}
                    options={pelabuhanOption}
                    onChange={handlePelabuhanChange}
                    getOptionLabel={(option) => option ? option.text : ''}
                    onInputChange={onInputPelabuhanChange}
                    renderInput={(params) => (
                      <TextField {...params} label="Choose an option" variant="outlined" />
                    )}
                    />
                </td>
              </tr>
              <tr>
                <td>Barang</td>
                <td>
                  <div style={({display: 'flex', flexDirection: 'column'} )}>
                  <input
                    value={formData.barang}
                    type="text"
                    name="Barang"
                    onChange={handleBarangChange}
                  />
                  <textarea
                    name="deskripsi"
                    value={uraian}
                    onChange={(event) => setUraian(event.target.value)}
                  />
                  </div>
                  
                </td>
              </tr>
              <tr>
                <td>Harga</td>
                <td>
                <input
                    type="number"
                    name="harga"
                />
                </td>
              </tr>
              <tr>
                <td>Tarif Bea Masuk</td>
                <td>
                <input
                    type="text"
                    name="tarifBeaMasuk"
                    readOnly
                />
                </td>
              </tr>
              <tr>
                <td>Total Bea Masuk</td>
                <td>
                <input
                    type="text"
                    name="totalBeaMasuk"
                    readOnly
                />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
    );
};


export default App
