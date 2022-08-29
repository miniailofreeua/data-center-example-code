import toastr from 'toastr';

interface IToastOptions {
  title?: string;
  message?: string;
}

export function toastSuccess(options: IToastOptions) {
  const title = options.title || 'Success';
  const message = options.message || 'Request successfully completed';

  toastr.success(title, message, {
    timeOut: 10000,
    extendedTimeOut: 10000,
    preventDuplicates: true,
  });
}

export function toastError(options: IToastOptions) {
  const title = options.title || 'Error';
  const message = options.message || 'Something went wrong';

  toastr.error(message, title, {
    timeOut: 10000,
    extendedTimeOut: 10000,
    preventDuplicates: true,
  });
}

export function toastWarning(options: IToastOptions) {
  const title = options.title || 'Warning';
  const message = options.message || 'Something went wrong';

  toastr.warning(title, message, {
    timeOut: 10000,
    extendedTimeOut: 10000,
    preventDuplicates: true,
  });
}
