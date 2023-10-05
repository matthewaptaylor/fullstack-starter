import { I18nProvider } from 'react-aria';

/**
 * Wrap a component with an I18nProvider.
 * @param Component The component to wrap.
 * @returns The wrapped component.
 */
const WithI18nProvider = (Component: React.FC) => {
  const Wrapper: React.FC<Record<string, unknown>> = (props) => (
    <I18nProvider locale="en">
      <Component {...props} />
    </I18nProvider>
  );

  return Wrapper;
};

export default WithI18nProvider;
