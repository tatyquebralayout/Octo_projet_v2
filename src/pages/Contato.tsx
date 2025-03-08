import React from 'react';
import { useContactForm } from '../hooks/useContactForm';
import { useNotifications } from '../services/notifications/context';

const Contato = () => {
  // Utiliza o hook de formulário de contato
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useContactForm();

  // Utiliza o hook de notificações para feedback
  const { showSuccessToast, showErrorToast } = useNotifications();

  // Função para lidar com o envio do formulário
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
      showSuccessToast(
        'Mensagem enviada!', 
        'Recebemos sua mensagem e retornaremos em breve.'
      );
      resetForm();
    } catch (error) {
      showErrorToast(
        'Erro ao enviar mensagem', 
        'Ocorreu um problema ao enviar sua mensagem. Por favor, tente novamente.'
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-h1 mb-6">Fale com a OCTO</h1>
        <p className="text-body mb-8">Preencha o formulário abaixo para entrar em contato com nossa equipe. Responderemos o mais breve possível.</p>
        
        <form onSubmit={onSubmitForm} className="space-y-6">
          {/* Nome */}
          <div className="form-group">
            <label htmlFor="name" className="form-label block mb-2">Nome</label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field w-full ${touched.name && errors.name ? 'border-red-500' : ''}`}
              placeholder="Seu nome completo"
            />
            {touched.name && errors.name && (
              <p className="text-error mt-1 text-sm">{errors.name}</p>
            )}
          </div>
          
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label block mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field w-full ${touched.email && errors.email ? 'border-red-500' : ''}`}
              placeholder="seu.email@exemplo.com"
            />
            {touched.email && errors.email && (
              <p className="text-error mt-1 text-sm">{errors.email}</p>
            )}
          </div>
          
          {/* Telefone */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label block mb-2">Telefone (opcional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field w-full ${touched.phone && errors.phone ? 'border-red-500' : ''}`}
              placeholder="(00) 00000-0000"
            />
            {touched.phone && errors.phone && (
              <p className="text-error mt-1 text-sm">{errors.phone}</p>
            )}
          </div>
          
          {/* Assunto */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label block mb-2">Assunto</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field w-full ${touched.subject && errors.subject ? 'border-red-500' : ''}`}
              placeholder="Assunto da mensagem"
            />
            {touched.subject && errors.subject && (
              <p className="text-error mt-1 text-sm">{errors.subject}</p>
            )}
          </div>
          
          {/* Mensagem */}
          <div className="form-group">
            <label htmlFor="message" className="form-label block mb-2">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-field w-full h-32 ${touched.message && errors.message ? 'border-red-500' : ''}`}
              placeholder="Digite sua mensagem aqui..."
            />
            {touched.message && errors.message && (
              <p className="text-error mt-1 text-sm">{errors.message}</p>
            )}
          </div>
          
          {/* Termos */}
          <div className="form-group">
            <div className="flex items-start">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={values.termsAccepted}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label htmlFor="termsAccepted" className="text-body-small">
                Concordo com os <a href="/termos" className="text-link">termos de uso</a> e <a href="/privacidade" className="text-link">política de privacidade</a>
              </label>
            </div>
            {touched.termsAccepted && errors.termsAccepted && (
              <p className="text-error mt-1 text-sm">{errors.termsAccepted}</p>
            )}
          </div>
          
          {/* Newsletter */}
          <div className="form-group">
            <div className="flex items-start">
              <input
                id="newsletterSubscribe"
                name="newsletterSubscribe"
                type="checkbox"
                checked={values.newsletterSubscribe}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label htmlFor="newsletterSubscribe" className="text-body-small">
                Quero receber novidades e atualizações por email
              </label>
            </div>
          </div>
          
          {/* Botões */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-outline"
            >
              Limpar formulário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contato;