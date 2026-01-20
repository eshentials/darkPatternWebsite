const LOG_KEY = 'dpriLogs';
const PARTICIPANT_KEY = 'dpriParticipantId';

const getParticipantId = () => {
  const existing = localStorage.getItem(PARTICIPANT_KEY);
  if (existing) return existing;
  const id = `p_${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem(PARTICIPANT_KEY, id);
  return id;
};

export const logEvent = ({ taskId = '', eventType = '', outcomeType = '', elementId = '' }) => {
  const payload = {
    timestamp: new Date().toISOString(),
    participant_id: getParticipantId(),
    task_id: taskId,
    event_type: eventType,
    outcome_type: outcomeType,
    element_id: elementId
  };

  const existing = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
  existing.push(payload);
  localStorage.setItem(LOG_KEY, JSON.stringify(existing));
};

export const logTaskStart = (taskId, elementId = '') => {
  logEvent({ taskId, eventType: 'task_start', elementId });
};

export const initDpriLogger = () => {
  if (window.__dpriLoggerInitialized) return;
  window.__dpriLoggerInitialized = true;

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-decision-role],[data-recovery]');
    if (!target) return;

    const taskId = target.dataset.taskId || '';
    const elementId = target.id || '';

    if (target.dataset.recovery === 'true') {
      logEvent({
        taskId,
        eventType: 'recovery_action',
        outcomeType: target.dataset.recoveryFrom || '',
        elementId
      });
      return;
    }

    if (target.dataset.decisionRole === 'final') {
      const outcomeType = target.dataset.outcomeType || '';
      logEvent({ taskId, eventType: 'outcome_selected', outcomeType, elementId });
      logEvent({ taskId, eventType: 'task_end', outcomeType, elementId });
    }
  });

  window.exportDpriLogs = () => JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
};
