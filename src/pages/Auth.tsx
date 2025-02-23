import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${props => props.theme.colors.background};
  z-index: 9999;
`;

const AuthForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  text-decoration: underline;
  width: 100%;
  text-align: center;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  text-align: center;
  margin-bottom: 1rem;
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let success;
      if (isLogin) {
        success = await login(username, password);
        if (success) {
          navigate('/');
        } else {
          setError('아이디 또는 비밀번호가 잘못되었습니다.');
        }
      } else {
        if (!email.includes('@')) {
          setError('유효한 이메일 주소를 입력해주세요.');
          return;
        }
        success = await register(username, password, email);
        if (success) {
          navigate('/');
        } else {
          setError('이미 사용중인 아이디 또는 이메일입니다.');
        }
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <AuthForm onSubmit={handleSubmit}>
        <Title>{isLogin ? '로그인' : '회원가입'}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <Button type="submit">
          {isLogin ? '로그인' : '회원가입'}
        </Button>
        <ToggleButton type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '회원가입하기' : '로그인하기'}
        </ToggleButton>
      </AuthForm>
    </Container>
  );
};

export default Auth; 