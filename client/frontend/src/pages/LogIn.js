import React from 'react'
import { Button, TextField } from '@mui/material';

function LogIn() {
  return (
    <>
      <TextField label="Kullanıcı Adı" variant="outlined" color="secondary" />
      <br />
      <TextField label="Şifre" variant="outlined" type="password"color="secondary" />
      <br />
      <p>
        Henüz hesabın yok mu?{' '}
        <a href="/signup" style={{ color: 'purple' }}>
          Kayıt Ol
        </a>
      </p>
      <Button variant="contained" color="secondary">Giriş</Button>
    </>
  );
}

export default LogIn;
